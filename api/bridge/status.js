const bridgeState = {
  ok: true,
  bridge: "eden-content-factory",
  mode: "frontend-live-bridge",
  lanes: [
    "intake",
    "planning",
    "sandbox",
    "validation",
    "promotion",
    "autonomous-improvement"
  ],
  approvedNow: [
    "serve_frontend",
    "show_draft_content_factory",
    "process_non_production_queue_receipts",
    "run_readiness_heartbeat"
  ],
  stillGated: [
    "production_deploys_without_user_approval",
    "shopify_mutations",
    "stripe_mutations",
    "supabase_schema_changes",
    "vercel_environment_changes",
    "external_publishing"
  ]
};

export default function handler(_request, response) {
  response.status(200).json({
    ...bridgeState,
    timestamp: new Date().toISOString()
  });
}
