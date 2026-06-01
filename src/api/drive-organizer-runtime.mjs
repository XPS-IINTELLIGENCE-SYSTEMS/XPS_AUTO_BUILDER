import moveFileHandler from './drive-move-file.mjs';
import { organizeEdenSkyeBatch } from './drive-bulk-organize-eden-skye.mjs';

function readToken(headers = {}, payload = {}) {
  return headers['x-drive-bridge-token'] || headers['X-Drive-Bridge-Token'] || payload.token || '';
}

export async function driveOrganizerRuntime(payload = {}, context = {}) {
  const action = String(payload.action || 'move_file').trim();
  const token = context.token || readToken(context.headers, payload);

  if (action === 'move_file') {
    return moveFileHandler(payload, {
      ...context,
      token,
      actor: context.actor || 'AUTO_BUILDER_RUNTIME_ROUTE'
    });
  }

  if (action === 'eden_skye_bulk_organize') {
    const items = Array.isArray(payload.items) ? payload.items : [];
    return organizeEdenSkyeBatch(items, {
      dryRun: payload.dryRun !== false,
      token,
      actor: context.actor || 'EDEN_SKYE_RUNTIME_ROUTE'
    });
  }

  return {
    ok: false,
    status: 400,
    error: `Unsupported Drive organizer action: ${action}`
  };
}

export default driveOrganizerRuntime;
