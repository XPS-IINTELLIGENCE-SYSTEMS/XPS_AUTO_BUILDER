const stage = document.querySelector("#stage");
const status = document.querySelector("#status");
const metricTotal = document.querySelector("#metric-total");
const metricBlocked = document.querySelector("#metric-blocked");
const metricPending = document.querySelector("#metric-pending");
const queueList = document.querySelector("#queue-list");
const bridgeList = document.querySelector("#bridge-list");
const integrationList = document.querySelector("#integration-list");
const validationList = document.querySelector("#validation-list");
const approvalList = document.querySelector("#approval-list");
const queueForm = document.querySelector("#queue-form");
const validationButton = document.querySelector("#refresh-validation");

async function getJson(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json();
}

function pill(value, extra = "") {
  return `<span class="pill ${String(value).toLowerCase()} ${extra}">${value}</span>`;
}

function queueMarkup(item) {
  return `
    <article class="list-item">
      <div class="row">
        <div>
          <strong>${item.title}</strong>
          <p>${item.evidence}</p>
        </div>
        ${pill(item.lane)}
      </div>
      <div class="row">
        <span>${item.platform} · ${item.priority} · ${item.owner}</span>
        ${pill(item.approvalState)}
      </div>
      <p><strong>Next:</strong> ${item.nextAction}</p>
      <div class="actions">
        <button class="secondary" data-queue-id="${item.id}" data-lane="ready">Ready</button>
        <button class="secondary" data-queue-id="${item.id}" data-lane="blocked">Block</button>
        <button class="secondary" data-queue-id="${item.id}" data-lane="done">Done</button>
      </div>
    </article>
  `;
}

function approvalMarkup(item) {
  return `
    <article class="list-item">
      <div class="row">
        <div>
          <strong>${item.subject}</strong>
          <p>${item.rule}</p>
        </div>
        ${pill(item.status)}
      </div>
      <div class="actions">
        <button class="secondary" data-approval-id="${item.id}" data-status="approved">Approve</button>
        <button class="secondary" data-approval-id="${item.id}" data-status="pending">Hold</button>
        <button class="secondary" data-approval-id="${item.id}" data-status="rejected">Reject</button>
      </div>
    </article>
  `;
}

async function loadOverview() {
  const overview = await getJson("/api/overview");
  stage.textContent = overview.currentStage;
  status.textContent = overview.currentStatus;
  metricTotal.textContent = overview.queueSummary.total;
  metricBlocked.textContent = overview.queueSummary.blocked;
  metricPending.textContent = overview.approvalSummary.pending;

  integrationList.innerHTML = overview.verified
    .map(
      (item) => `
        <article class="list-item">
          <div class="row">
            <strong>${item.label}</strong>
            ${pill(item.status)}
          </div>
          <p>${item.detail}</p>
        </article>
      `
    )
    .join("");
}

async function loadQueue() {
  const data = await getJson("/api/queue");
  queueList.innerHTML = data.items.map(queueMarkup).join("");
}

async function loadApprovals() {
  const data = await getJson("/api/approvals");
  approvalList.innerHTML = data.items.map(approvalMarkup).join("");
}

async function loadValidation() {
  const data = await getJson("/api/validation/run");
  validationList.innerHTML = `
    <article class="list-item">
      <strong>${data.currentStatus}</strong>
      <p>${data.evidence.join(" ")}</p>
      <p><strong>Blockers:</strong> ${data.blockers.join(" ")}</p>
    </article>
  `;
}

async function loadBridge() {
  const data = await getJson("/api/bridge/blockers");
  bridgeList.innerHTML = data.workaroundQueue
    .map(
      (item) => `
        <article class="list-item">
          <div class="row">
            <strong>${item.action}</strong>
            ${pill(item.status)}
          </div>
        </article>
      `
    )
    .join("");
}

queueForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(queueForm);
  const title = formData.get("title");
  if (!title) {
    return;
  }
  await getJson("/api/queue", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ title })
  });
  queueForm.reset();
  await loadQueue();
  await loadOverview();
});

document.body.addEventListener("click", async (event) => {
  const queueButton = event.target.closest("[data-queue-id]");
  if (queueButton) {
    await getJson(`/api/queue/${queueButton.dataset.queueId}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ lane: queueButton.dataset.lane })
    });
    await Promise.all([loadQueue(), loadOverview()]);
  }

  const approvalButton = event.target.closest("[data-approval-id]");
  if (approvalButton) {
    await getJson(`/api/approvals/${approvalButton.dataset.approvalId}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status: approvalButton.dataset.status })
    });
    await loadApprovals();
    await loadOverview();
  }
});

validationButton.addEventListener("click", loadValidation);

await Promise.all([loadOverview(), loadQueue(), loadApprovals(), loadBridge(), loadValidation()]);
