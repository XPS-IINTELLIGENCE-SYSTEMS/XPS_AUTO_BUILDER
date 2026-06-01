import { google } from "googleapis";

function normalizePrivateKey(value = "") {
  return value.replace(/\\n/g, "\n");
}

export function getGoogleDriveAuthConfig() {
  const scopes = ["https://www.googleapis.com/auth/drive"];

  if (process.env.GOOGLE_REFRESH_TOKEN) {
    return {
      mode: "oauth_refresh_token",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      scopes
    };
  }

  return {
    mode: "service_account",
    clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
    privateKey: normalizePrivateKey(process.env.GOOGLE_PRIVATE_KEY || ""),
    scopes
  };
}

export function assertGoogleDriveClientConfig() {
  const config = getGoogleDriveAuthConfig();
  const missing = [];

  if (config.mode === "oauth_refresh_token") {
    if (!config.clientId) missing.push("GOOGLE_CLIENT_ID");
    if (!config.clientSecret) missing.push("GOOGLE_CLIENT_SECRET");
    if (!config.refreshToken) missing.push("GOOGLE_REFRESH_TOKEN");
  } else {
    if (!config.clientEmail) missing.push("GOOGLE_CLIENT_EMAIL");
    if (!config.privateKey) missing.push("GOOGLE_PRIVATE_KEY");
  }

  return {
    ok: missing.length === 0,
    mode: config.mode,
    missing
  };
}

export function createGoogleDriveClient() {
  const configCheck = assertGoogleDriveClientConfig();

  if (!configCheck.ok) {
    throw new Error(`Google Drive client config missing: ${configCheck.missing.join(", ")}`);
  }

  const config = getGoogleDriveAuthConfig();

  if (config.mode === "oauth_refresh_token") {
    const auth = new google.auth.OAuth2(config.clientId, config.clientSecret);
    auth.setCredentials({ refresh_token: config.refreshToken });
    return google.drive({ version: "v3", auth });
  }

  const auth = new google.auth.JWT({
    email: config.clientEmail,
    key: config.privateKey,
    scopes: config.scopes
  });

  return google.drive({ version: "v3", auth });
}
