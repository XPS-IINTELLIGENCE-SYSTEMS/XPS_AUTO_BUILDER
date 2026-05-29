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
