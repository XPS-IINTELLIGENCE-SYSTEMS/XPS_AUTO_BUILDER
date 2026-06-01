const DEFAULT_ALLOWED_ROOTS = (process.env.GOOGLE_DRIVE_ALLOWED_ROOT_FOLDER_IDS || "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

export function assertDriveBridgeConfig({ allowedRootFolderIds = DEFAULT_ALLOWED_ROOTS } = {}) {
  const missing = [];

  if (!process.env.DRIVE_BRIDGE_ADMIN_TOKEN) missing.push("DRIVE_BRIDGE_ADMIN_TOKEN");
  if (!process.env.GOOGLE_CLIENT_EMAIL && !process.env.GOOGLE_REFRESH_TOKEN) {
    missing.push("GOOGLE_CLIENT_EMAIL or GOOGLE_REFRESH_TOKEN");
  }
  if (!process.env.GOOGLE_PRIVATE_KEY && !process.env.GOOGLE_REFRESH_TOKEN) {
    missing.push("GOOGLE_PRIVATE_KEY or GOOGLE_REFRESH_TOKEN");
  }
  if (!allowedRootFolderIds.length) missing.push("GOOGLE_DRIVE_ALLOWED_ROOT_FOLDER_IDS");

  if (missing.length) {
    return {
      ok: false,
      missing,
      message: `Drive bridge is not ready. Missing: ${missing.join(", ")}`
    };
  }

  return { ok: true, missing: [], message: "Drive bridge configuration is present." };
}

export function verifyDriveBridgeToken(requestToken) {
  const expected = process.env.DRIVE_BRIDGE_ADMIN_TOKEN;
  return Boolean(expected && requestToken && requestToken === expected);
}

export function normalizeMoveRequest(input = {}) {
  const fileId = String(input.fileId || "").trim();
  const fromFolderId = String(input.fromFolderId || "").trim();
  const toFolderId = String(input.toFolderId || "").trim();
  const reason = String(input.reason || "").trim();
  const dryRun = input.dryRun !== false;

  return { fileId, fromFolderId, toFolderId, reason, dryRun };
}

export function validateMoveRequest(request, { allowedFolderIds = DEFAULT_ALLOWED_ROOTS } = {}) {
  const errors = [];

  if (!request.fileId) errors.push("fileId is required");
  if (!request.fromFolderId) errors.push("fromFolderId is required");
  if (!request.toFolderId) errors.push("toFolderId is required");
  if (!request.reason) errors.push("reason is required");
  if (request.fromFolderId && request.toFolderId && request.fromFolderId === request.toFolderId) {
    errors.push("fromFolderId and toFolderId cannot be the same");
  }
  if (allowedFolderIds.length && !allowedFolderIds.includes(request.fromFolderId)) {
    errors.push("fromFolderId is not in the approved allowlist");
  }
  if (allowedFolderIds.length && !allowedFolderIds.includes(request.toFolderId)) {
    errors.push("toFolderId is not in the approved allowlist");
  }

  return {
    ok: errors.length === 0,
    errors
  };
}

export function buildDriveMoveUpdate({ fileId, fromFolderId, toFolderId }) {
  return {
    fileId,
    addParents: toFolderId,
    removeParents: fromFolderId,
    fields: "id,name,parents,webViewLink",
    supportsAllDrives: true
  };
}

export function buildAuditRecord({ request, actor = "AUTO_BUILDER", status, result = null, errors = [] }) {
  return {
    event: "google_drive_file_move",
    bridge: "google-drive-file-organizer-bridge",
    actor,
    status,
    dryRun: request.dryRun,
    fileId: request.fileId,
    fromFolderId: request.fromFolderId,
    toFolderId: request.toFolderId,
    reason: request.reason,
    result,
    errors,
    createdAtUtc: new Date().toISOString()
  };
}

export async function moveDriveFile({ drive, request, actor = "AUTO_BUILDER" }) {
  const normalized = normalizeMoveRequest(request);
  const validation = validateMoveRequest(normalized);

  if (!validation.ok) {
    return {
      ok: false,
      dryRun: normalized.dryRun,
      audit: buildAuditRecord({ request: normalized, actor, status: "rejected", errors: validation.errors })
    };
  }

  const update = buildDriveMoveUpdate(normalized);

  if (normalized.dryRun) {
    return {
      ok: true,
      dryRun: true,
      plannedUpdate: update,
      audit: buildAuditRecord({ request: normalized, actor, status: "dry_run_ready", result: update })
    };
  }

  if (!drive?.files?.update) {
    return {
      ok: false,
      dryRun: false,
      audit: buildAuditRecord({
        request: normalized,
        actor,
        status: "blocked",
        errors: ["Google Drive client with files.update is required for live moves"]
      })
    };
  }

  const response = await drive.files.update(update);

  return {
    ok: true,
    dryRun: false,
    result: response.data || response,
    audit: buildAuditRecord({ request: normalized, actor, status: "moved", result: response.data || response })
  };
}
