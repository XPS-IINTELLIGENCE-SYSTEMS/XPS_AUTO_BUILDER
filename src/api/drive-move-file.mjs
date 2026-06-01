import { createGoogleDriveClient } from '../lib/google-drive-client.mjs';
import { moveDriveFile, normalizeMoveRequest, verifyDriveBridgeToken } from '../lib/google-drive-file-organizer-bridge.mjs';

export async function moveFileHandler(payload = {}, context = {}) {
  const token = context.token || payload.token || '';
  if (!verifyDriveBridgeToken(token)) {
    return { ok: false, status: 401, error: 'Unauthorized Drive bridge request' };
  }

  const request = normalizeMoveRequest(payload);
  const drive = request.dryRun ? null : createGoogleDriveClient();
  const result = await moveDriveFile({ drive, request, actor: context.actor || 'AUTO_BUILDER_DRIVE_BRIDGE' });

  return {
    status: result.ok ? 200 : 400,
    ...result
  };
}

export default moveFileHandler;
