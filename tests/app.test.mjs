import test from "node:test";
import assert from "node:assert/strict";
import { once } from "node:events";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { defaultApprovals, defaultQueueItems } from "../src/lib/system-state.mjs";

async function withServer(fn) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "auto-builder-"));
  fs.writeFileSync(path.join(tempDir, "queue.json"), JSON.stringify(defaultQueueItems, null, 2));
  fs.writeFileSync(path.join(tempDir, "approvals.json"), JSON.stringify(defaultApprovals, null, 2));
  process.env.STORAGE_DIR = tempDir;

  const { createApp } = await import(`../src/server/app.mjs?stamp=${Date.now()}`);
  const server = createApp();
  server.listen(0);
  await once(server, "listening");
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;
  try {
    await fn(baseUrl);
  } finally {
    server.close();
    delete process.env.STORAGE_DIR;
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

test("health endpoint returns ok", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/health`);
    assert.equal(response.status, 200);
    const data = await response.json();
    assert.equal(data.ok, true);
  });
});

test("overview exposes validated targets", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/overview`);
    const data = await response.json();
    assert.equal(data.integrations.github.repository, "XPS-IINTELLIGENCE-SYSTEMS/XPS_AUTO_BUILDER");
    assert.equal(data.integrations.vercel.projectName, "auto-builder");
  });
});

test("queue endpoint creates a new item", async () => {
  await withServer(async (baseUrl) => {
    const createResponse = await fetch(`${baseUrl}/api/queue`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title: "Test queue item" })
    });
    assert.equal(createResponse.status, 201);

    const listResponse = await fetch(`${baseUrl}/api/queue`);
    const data = await listResponse.json();
    assert.equal(data.items[0].title, "Test queue item");
  });
});

test("approval endpoint updates state", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/approvals/a-001`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status: "approved" })
    });
    assert.equal(response.status, 200);
    const data = await response.json();
    assert.equal(data.item.status, "approved");
  });
});

test("frontend renders html", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(baseUrl);
    const html = await response.text();
    assert.match(html, /Content Factory Control Room/);
    assert.match(html, /Approval Gates/);
  });
});

test("Eden provider status reports configuration without secrets", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/bridge/providers/runtime-status`);
    assert.equal(response.status, 200);
    const data = await response.json();
    assert.equal(data.system, "EDEN_SKYE_AUTO_BUILDER_SYNC");
    assert.ok(Array.isArray(data.providers));
    assert.ok(data.providers.some((provider) => provider.provider === "supabase"));
    assert.equal(JSON.stringify(data).includes("SERVICE_ROLE_KEY:"), false);
  });
});

test("Eden social draft route keeps public publishing disabled", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/bridge/social-media/draft`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        text: "AI can fake almost anything, but it cannot fake a real transformation.",
        network: "facebook",
        platformTarget: "eden_skye_facebook"
      })
    });
    assert.equal(response.status, 202);
    const data = await response.json();
    assert.equal(data.workflow, "eden_social_draft_queue");
    assert.equal(data.draft.mode, "draft_only");
    assert.equal(data.draft.publishState, "not_approved");
    assert.equal(data.receipt.publicMutationAllowed, false);
  });
});

test("Eden launch workflow returns approval-gated sequence", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/workflows/eden-launch`);
    assert.equal(response.status, 200);
    const data = await response.json();
    assert.equal(data.workflow, "eden_30_day_launch_runtime");
    assert.equal(data.mode, "governed_vercel_workflow");
    assert.equal(data.publishAllowed, false);
    assert.ok(data.automationSequence.includes("clone_winners"));
  });
});

test("Eden workflow contract exposes runtime routes", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/workflows/eden-launch/contract`);
    assert.equal(response.status, 200);
    const data = await response.json();
    assert.equal(data.runtime, "vercel_workflow");
    assert.equal(data.routes.socialBridgeCron, "/api/cron/social-bridge");
    assert.equal(data.queueContract.defaultMode, "draft_only");
  });
});
