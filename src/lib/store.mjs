import fs from "node:fs";
import path from "node:path";
import { defaultApprovals, defaultQueueItems, systemSnapshot } from "./system-state.mjs";

function getStorageDir() {
  return process.env.STORAGE_DIR
    ? path.resolve(process.env.STORAGE_DIR)
    : path.resolve(process.cwd(), "storage");
}

function ensureFile(name, fallback) {
  const file = path.join(getStorageDir(), name);
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify(fallback, null, 2));
  }
  return file;
}

function readJson(name, fallback) {
  const file = ensureFile(name, fallback);
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeJson(name, data) {
  const file = ensureFile(name, data);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  return data;
}

export function getOverview() {
  const queue = readJson("queue.json", defaultQueueItems);
  const approvals = readJson("approvals.json", defaultApprovals);
  return {
    ...systemSnapshot,
    queueSummary: {
      total: queue.length,
      blocked: queue.filter((item) => item.lane === "blocked").length,
      awaitingApproval: queue.filter((item) => item.approvalState === "pending").length
    },
    approvalSummary: {
      total: approvals.length,
      pending: approvals.filter((item) => item.status === "pending").length,
      approved: approvals.filter((item) => item.status === "approved").length
    }
  };
}

export function listQueue() {
  return readJson("queue.json", defaultQueueItems);
}

export function addQueueItem(input) {
  const queue = listQueue();
  const item = {
    id: `q-${Date.now()}`,
    title: input.title,
    owner: input.owner || "AUTO BUILDER",
    lane: input.lane || "ready",
    priority: input.priority || "medium",
    platform: input.platform || "General",
    approvalState: input.approvalState || "pending",
    evidence: input.evidence || "User-created queue item.",
    nextAction: input.nextAction || "Review and route."
  };
  queue.unshift(item);
  writeJson("queue.json", queue);
  return item;
}

export function updateQueueStatus(id, lane) {
  const queue = listQueue();
  const item = queue.find((entry) => entry.id === id);
  if (!item) {
    return null;
  }
  item.lane = lane;
  if (lane === "done") {
    item.approvalState = "approved";
  }
  writeJson("queue.json", queue);
  return item;
}

export function listApprovals() {
  return readJson("approvals.json", defaultApprovals);
}

export function updateApproval(id, status) {
  const approvals = listApprovals();
  const approval = approvals.find((entry) => entry.id === id);
  if (!approval) {
    return null;
  }
  approval.status = status;
  writeJson("approvals.json", approvals);
  return approval;
}

export function getValidationSnapshot() {
  const overview = getOverview();
  return {
    currentStatus: "Locally validated sandbox build",
    verified: overview.verified,
    inferred: overview.inferred,
    couldNotVerify: overview.couldNotVerify,
    evidence: [
      "Frontend route and static assets served locally.",
      "API health, overview, queue mutation, and approval mutation covered by node:test.",
      "Supabase migration, Vercel config, GitHub workflows, and GitHub Pages docs are present in repo."
    ],
    blockers: [
      "Remote sync and deployment were not executed from this sandbox.",
      "Drive export destination is still unresolved."
    ]
  };
}

export function getBridgeSnapshot() {
  const overview = getOverview();
  return {
    currentStatus: "Bridge active for blocked live operations",
    bridge: overview.bridge,
    blockers: overview.couldNotVerify,
    workaroundQueue: [
      {
        id: "bridge-github",
        action: "Prepare remote release branch and PR packet",
        status: "ready"
      },
      {
        id: "bridge-vercel",
        action: "Use verified Vercel project metadata plus deploy contract for promotion",
        status: "ready"
      },
      {
        id: "bridge-supabase",
        action: "Use migration file and seed script as exact handoff artifact",
        status: "ready"
      },
      {
        id: "bridge-drive",
        action: "Pause at export gate until folder target is grounded",
        status: "awaiting-approval"
      }
    ]
  };
}
