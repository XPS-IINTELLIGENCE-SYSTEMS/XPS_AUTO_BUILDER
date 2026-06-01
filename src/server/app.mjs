import fs from "node:fs";
import path from "node:path";
import { createServer } from "node:http";
import {
  addQueueItem,
  getBridgeSnapshot,
  getOverview,
  getValidationSnapshot,
  listApprovals,
  listQueue,
  updateApproval,
  updateQueueStatus
} from "../lib/store.mjs";
import {
  createEdenDraftWorkflow,
  getEdenProviderStatus,
  getEdenWorkflowContract,
  runEdenLaunchWorkflow
} from "../lib/eden-vercel-workflow.mjs";

const publicDir = path.resolve(process.cwd(), "public");
const docsSiteDir = path.resolve(process.cwd(), "docs-site");

function json(res, status, body) {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body, null, 2));
}

function sendFile(res, filename, contentType = "text/plain; charset=utf-8") {
  if (!fs.existsSync(filename)) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }
  res.writeHead(200, { "content-type": contentType });
  res.end(fs.readFileSync(filename));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

function routeStatic(req, res) {
  const pathname = new URL(req.url, "http://localhost").pathname;
  const staticMap = {
    "/app.css": ["app.css", "text/css; charset=utf-8"],
    "/app.js": ["app.js", "text/javascript; charset=utf-8"],
    "/handbook": ["index.html", "text/html; charset=utf-8"],
    "/handbook/": ["index.html", "text/html; charset=utf-8"],
    "/handbook/assets/site.css": ["assets/site.css", "text/css; charset=utf-8"]
  };

  if (pathname === "/") {
    return sendFile(res, path.join(publicDir, "index.html"), "text/html; charset=utf-8");
  }

  if (staticMap[pathname]) {
    const [file, type] = staticMap[pathname];
    const base = pathname.startsWith("/handbook") ? docsSiteDir : publicDir;
    return sendFile(res, path.join(base, file), type);
  }

  return false;
}

async function routeApi(req, res) {
  const url = new URL(req.url, "http://localhost");
  const { pathname } = url;

  if (pathname === "/api/health" && req.method === "GET") {
    return json(res, 200, {
      ok: true,
      service: "XPS AUTO BUILDER",
      timestamp: new Date().toISOString()
    });
  }

  if (pathname === "/api/overview" && req.method === "GET") {
    return json(res, 200, getOverview());
  }

  if (pathname === "/api/queue" && req.method === "GET") {
    return json(res, 200, { items: listQueue() });
  }

  if (pathname === "/api/queue" && req.method === "POST") {
    const body = await readBody(req);
    if (!body.title) {
      return json(res, 400, { error: "title is required" });
    }
    return json(res, 201, { item: addQueueItem(body) });
  }

  if (pathname.startsWith("/api/queue/") && req.method === "POST") {
    const id = pathname.split("/")[3];
    const body = await readBody(req);
    const updated = updateQueueStatus(id, body.lane || "ready");
    if (!updated) {
      return json(res, 404, { error: "queue item not found" });
    }
    return json(res, 200, { item: updated });
  }

  if (pathname === "/api/approvals" && req.method === "GET") {
    return json(res, 200, { items: listApprovals() });
  }

  if (pathname.startsWith("/api/approvals/") && req.method === "POST") {
    const id = pathname.split("/")[3];
    const body = await readBody(req);
    const updated = updateApproval(id, body.status || "pending");
    if (!updated) {
      return json(res, 404, { error: "approval not found" });
    }
    return json(res, 200, { item: updated });
  }

  if (pathname === "/api/validation/run" && req.method === "GET") {
    return json(res, 200, getValidationSnapshot());
  }

  if (pathname === "/api/bridge/blockers" && req.method === "GET") {
    return json(res, 200, getBridgeSnapshot());
  }

  if (pathname === "/api/bridge/providers/runtime-status" && req.method === "GET") {
    return json(res, 200, getEdenProviderStatus());
  }

  if (pathname === "/api/bridge/social-media/draft" && req.method === "POST") {
    const body = await readBody(req);
    return json(res, 202, createEdenDraftWorkflow(body));
  }

  if (pathname === "/api/cron/social-bridge" && req.method === "GET") {
    return json(res, 200, runEdenLaunchWorkflow({
      testDraft: {
        text: "Cron validation draft for Eden Skye social bridge. Review before publishing.",
        source: "vercel-cron:/api/cron/social-bridge"
      }
    }));
  }

  if (pathname === "/api/workflows/eden-launch" && req.method === "GET") {
    return json(res, 200, runEdenLaunchWorkflow());
  }

  if (pathname === "/api/workflows/eden-launch" && req.method === "POST") {
    const body = await readBody(req);
    return json(res, 202, runEdenLaunchWorkflow(body));
  }

  if (pathname === "/api/workflows/eden-launch/contract" && req.method === "GET") {
    return json(res, 200, getEdenWorkflowContract());
  }

  if (pathname === "/api/jobs/daily-sync" && req.method === "GET") {
    return json(res, 200, {
      ok: true,
      job: "daily-sync",
      action: "Would refresh queue, approvals, integration posture, and docs export manifests."
    });
  }

  if (pathname === "/api/jobs/queue-sweep" && req.method === "GET") {
    return json(res, 200, {
      ok: true,
      job: "queue-sweep",
      action: "Would escalate blocked items and verify pending approvals."
    });
  }

  return json(res, 404, { error: "route not found" });
}

export function createApp() {
  return createServer(async (req, res) => {
    try {
      if (req.url.startsWith("/api/")) {
        return await routeApi(req, res);
      }
      const served = routeStatic(req, res);
      if (served !== false) {
        return;
      }
      res.writeHead(404);
      res.end("Not found");
    } catch (error) {
      json(res, 500, {
        error: "internal_error",
        detail: error instanceof Error ? error.message : String(error)
      });
    }
  });
}
