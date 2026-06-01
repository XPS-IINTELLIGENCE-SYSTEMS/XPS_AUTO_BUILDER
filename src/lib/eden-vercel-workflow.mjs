const REQUIRED_PROVIDER_ENV = {
  supabase: ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"],
  metricool: ["METRICOOL_API_URL", "METRICOOL_API_TOKEN"],
  vercelCron: ["CRON_SECRET"],
  xyla: ["XYLA_API_URL", "XYLA_API_TOKEN"],
  shopify: ["SHOPIFY_STORE_DOMAIN", "SHOPIFY_ADMIN_ACCESS_TOKEN"],
  heygen: ["HEYGEN_API_KEY"],
  runway: ["RUNWAY_API_KEY"],
  googleWorkspace: ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET"]
};

const APPROVAL_REQUIRED_ACTIONS = new Set([
  "public_social_post",
  "paid_ad_launch",
  "shopify_mutation",
  "supabase_schema_or_production_data_change",
  "vercel_production_deploy",
  "external_email_or_sms",
  "payment_or_discount_change",
  "source_truth_canon_change",
  "testimonial_or_customer_face_use",
  "product_spec_or_safety_claim",
  "income_or_certification_claim"
]);

const LAUNCH_LANES = [
  "intake",
  "planning",
  "production",
  "distribution",
  "analytics",
  "governance"
];

function getConfiguredEnv(provider) {
  const required = REQUIRED_PROVIDER_ENV[provider] || [];
  const missing = required.filter((key) => !process.env[key]);
  return {
    provider,
    configured: missing.length === 0,
    required,
    missing
  };
}

function normalizeDraft(input = {}) {
  return {
    brandId: input.brandId || "6316987",
    network: input.network || "facebook",
    platformTarget: input.platformTarget || "eden_skye_facebook",
    mode: "draft_only",
    approvalState: input.approvalState || "approved_for_draft",
    publishState: "not_approved",
    text: input.text || "Draft placeholder for Eden Skye launch workflow validation.",
    cta: input.cta || "Review before publishing.",
    source: input.source || "EDEN_SKYE/autonomy/start-today-runbook.md",
    riskNotes: input.riskNotes || "Draft-only validation item. No public publish authority.",
    createdAt: new Date().toISOString()
  };
}

export function getEdenProviderStatus() {
  const providers = Object.keys(REQUIRED_PROVIDER_ENV).map(getConfiguredEnv);
  const ready = providers.filter((provider) => provider.configured).map((provider) => provider.provider);
  const blocked = providers.filter((provider) => !provider.configured);

  return {
    ok: true,
    system: "EDEN_SKYE_AUTO_BUILDER_SYNC",
    status: blocked.length === 0 ? "ready" : "partial",
    ready,
    providers,
    blockers: blocked.map((provider) => ({
      provider: provider.provider,
      reason: "missing_runtime_configuration",
      missing: provider.missing
    })),
    approvalRequiredFor: Array.from(APPROVAL_REQUIRED_ACTIONS),
    timestamp: new Date().toISOString()
  };
}

export function createEdenDraftWorkflow(input = {}) {
  const draft = normalizeDraft(input);
  const shouldHold = draft.publishState !== "not_approved" || draft.mode !== "draft_only";

  return {
    ok: !shouldHold,
    workflow: "eden_social_draft_queue",
    action: shouldHold ? "approval_hold" : "queued_for_draft_only_bridge",
    draft,
    receipt: {
      event: shouldHold ? "eden_social_draft_blocked" : "eden_social_draft_accepted",
      lane: "distribution",
      queue: "eden_skye_social_bridge",
      worker: "eden-skye-social-worker",
      safeDefault: "draft_only",
      publicMutationAllowed: false,
      timestamp: new Date().toISOString()
    },
    nextAction: shouldHold
      ? "Route to approval queue before any public publish or paid action."
      : "Claim with social bridge cron, then log Metricool/Xyla draft receipt or blocker."
  };
}

export function runEdenLaunchWorkflow(input = {}) {
  const providerStatus = getEdenProviderStatus();
  const testDraft = createEdenDraftWorkflow(input.testDraft || {});

  return {
    ok: true,
    workflow: "eden_30_day_launch_runtime",
    mode: "governed_vercel_workflow",
    lanes: LAUNCH_LANES,
    providerStatus,
    testDraft,
    automationSequence: [
      "read_source_truth",
      "check_provider_readiness",
      "generate_or_load_draft_queue",
      "route_draft_only_items",
      "log_receipts_and_blockers",
      "hold_public_actions_for_approval",
      "score_analytics",
      "clone_winners"
    ],
    canStartToday: true,
    publishAllowed: false,
    paidAdsAllowed: false,
    shopifyMutationAllowed: false,
    supabaseMutationAllowed: false,
    vercelDeployAllowed: false,
    approvalGate: "required_before_external_mutation",
    nextHumanDecision: "Approve the first 72-hour schedule only after the draft bridge test logs a receipt or blocker.",
    timestamp: new Date().toISOString()
  };
}

export function getEdenWorkflowContract() {
  return {
    system: "EDEN_SKYE_AUTO_BUILDER_SYNC",
    runtime: "vercel_workflow",
    sourceTruth: {
      eden: "Strategic-Minds/EDEN_SKYE/autonomy/eden-auto-builder-sync-manifest.json",
      autoBuilder: "XPS-IINTELLIGENCE-SYSTEMS/XPS_AUTO_BUILDER/systems/eden-skye/eden-auto-builder-sync.json"
    },
    routes: {
      providerStatus: "/api/bridge/providers/runtime-status",
      socialDraft: "/api/bridge/social-media/draft",
      socialBridgeCron: "/api/cron/social-bridge",
      edenLaunchWorkflow: "/api/workflows/eden-launch"
    },
    queueContract: {
      queue: "eden_skye_social_bridge",
      defaultMode: "draft_only",
      approvalState: "approved_for_draft",
      publishState: "not_approved"
    },
    approvalRequiredFor: Array.from(APPROVAL_REQUIRED_ACTIONS)
  };
}
