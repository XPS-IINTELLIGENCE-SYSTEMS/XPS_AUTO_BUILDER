const jobs = [
  { job: 'Generate Week 1 content packet', lane: 'Content Factory', status: 'Ready', next: 'Create draft hooks, captions, visual briefs, CTAs', risk: 'Low' },
  { job: 'Build starter offer outline', lane: 'Commerce Drafts', status: 'Ready', next: 'Draft Shopify-ready offer copy without writing', risk: 'Low' },
  { job: 'Inspect held Supabase jobs', lane: 'Backend Review', status: 'Held', next: 'Convert each into approval brief', risk: 'Medium' },
  { job: 'Prepare Vercel preview receipt', lane: 'Frontend', status: 'Ready', next: 'Keep deployment non-production', risk: 'Low' },
  { job: 'External social publishing', lane: 'Audience Growth', status: 'Locked', next: 'Requires packet and channel approval', risk: 'High' },
  { job: 'Shopify product writes', lane: 'Commerce Live', status: 'Locked', next: 'Requires explicit product approval', risk: 'High' }
];

const content = [
  { type: 'Reel', title: 'The Factory Is Not The Brand', hook: 'Most people automate chaos. Eden automates standards.', cta: 'Starter kit waitlist', visual: 'Command desk, approval queue, warm monitor light' },
  { type: 'Carousel', title: 'From One Idea To Seven Assets', hook: 'The loop is hook, script, visual, caption, CTA, measure, clone.', cta: 'Save the system', visual: 'Minimal editorial slides with ivory, ink, rose accent' },
  { type: 'Short Script', title: 'Soft Brand, Sharp System', hook: 'A feminine brand can still run like a machine.', cta: 'Follow for the build', visual: 'Eden speaking to camera, calm direct gaze' },
  { type: 'Post', title: 'What Is Waiting For Approval', hook: 'Protected systems stay locked until the work earns trust.', cta: 'Comment factory', visual: 'Approval gate checklist, clean product UI crop' },
  { type: 'Offer', title: 'The Starter Kit Promise', hook: 'A content system for creators who want consistency before chaos.', cta: 'Join first access', visual: 'Digital product mockup, luxury desk arrangement' }
];

const approvals = [
  ['Production Deploys', 'No live deploys until preview is reviewed and accepted.'],
  ['Vercel Environment Changes', 'No secrets, env vars, or production cron changes without explicit approval.'],
  ['Supabase Schema Changes', 'No migrations, policies, functions, or table edits.'],
  ['Shopify Writes', 'No product, collection, discount, inventory, or theme edits.'],
  ['Stripe Actions', 'No payment, pricing, invoice, refund, or subscription actions.'],
  ['External Publishing', 'No social posts, email campaigns, or public messages.']
];

const nav = document.querySelectorAll('.nav-item');
const views = document.querySelectorAll('.view');
nav.forEach(button => {
  button.addEventListener('click', () => {
    nav.forEach(item => item.classList.remove('active'));
    views.forEach(view => view.classList.remove('active'));
    button.classList.add('active');
    document.querySelector(`#view-${button.dataset.view}`).classList.add('active');
  });
});

document.querySelector('#toggleBoundary').addEventListener('click', () => {
  document.querySelector('#boundaryPanel').classList.toggle('open');
});

const dialog = document.querySelector('#packetDialog');
document.querySelector('#openPacket').addEventListener('click', () => dialog.showModal());

const table = document.querySelector('#jobTable');
function renderJobs(showHeld = true) {
  table.innerHTML = '';
  jobs.filter(job => showHeld || !['Held', 'Locked'].includes(job.status)).forEach(job => {
    const row = document.createElement('tr');
    row.innerHTML = `<td><strong>${job.job}</strong></td><td>${job.lane}</td><td><span class="badge ${job.status === 'Ready' ? 'safe' : job.status === 'Held' ? 'warn' : ''}">${job.status}</span></td><td>${job.next}</td><td>${job.risk}</td>`;
    table.appendChild(row);
  });
}
renderJobs();
let showingHeld = true;
document.querySelector('#filterHeld').addEventListener('click', event => {
  showingHeld = !showingHeld;
  renderJobs(showingHeld);
  event.target.textContent = showingHeld ? 'Hide held jobs' : 'Show held jobs';
});

const list = document.querySelector('#contentList');
const angleCopy = document.querySelector('#angleCopy');
const angleCTA = document.querySelector('#angleCTA');
const angleVisual = document.querySelector('#angleVisual');
content.forEach((item, index) => {
  const node = document.createElement('article');
  node.className = `content-item ${index === 0 ? 'active' : ''}`;
  node.innerHTML = `<span class="badge safe">${item.type}</span><div><strong>${item.title}</strong><p>${item.hook}</p></div><span>${item.cta}</span>`;
  node.addEventListener('click', () => {
    document.querySelectorAll('.content-item').forEach(item => item.classList.remove('active'));
    node.classList.add('active');
    angleCopy.textContent = item.hook;
    angleCTA.textContent = item.cta;
    angleVisual.textContent = item.visual;
  });
  list.appendChild(node);
});
angleCopy.textContent = content[0].hook;
angleCTA.textContent = content[0].cta;
angleVisual.textContent = content[0].visual;

const approvalGrid = document.querySelector('#approvalGrid');
approvals.forEach(([title, copy]) => {
  const node = document.createElement('article');
  node.className = 'approval';
  node.innerHTML = `<span class="badge warn">Needs approval</span><strong>${title}</strong><p>${copy}</p>`;
  approvalGrid.appendChild(node);
});
