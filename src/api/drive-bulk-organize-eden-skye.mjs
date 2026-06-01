import { createGoogleDriveClient } from '../lib/google-drive-client.mjs';
import { moveDriveFile } from '../lib/google-drive-file-organizer-bridge.mjs';

export async function organizeEdenSkyeBatch(items = [], options = {}) {
  const drive = createGoogleDriveClient();
  const results = [];

  for (const item of items) {
    const result = await moveDriveFile({
      drive,
      request: {
        ...item,
        dryRun: options.dryRun !== false
      },
      actor: 'EDEN_SKYE_AUTONOMOUS_ORGANIZER'
    });

    results.push(result);
  }

  return {
    processed: results.length,
    dryRun: options.dryRun !== false,
    results
  };
}
