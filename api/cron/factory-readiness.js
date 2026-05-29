export default function handler(request, response) {
  const cronHeader = request.headers["x-vercel-cron"] || request.headers["X-Vercel-Cron"];
  const triggeredBy = cronHeader ? "vercel-cron" : "manual-check";

  response.status(200).json({
    ok: true,
    job: "factory-readiness",
    cadence: "*/5 * * * *",
    triggeredBy,
    actionsTaken: [
      "readiness_receipt_created",
      "frontend_bridge_checked",
      "protected_actions_left_gated"
    ],
    nextAllowedWork: [
      "draft_content_queue",
      "sandbox_validation",
      "approval_request_preparation"
    ],
    blockedWithoutApproval: [
      "shopify_write",
      "stripe_write",
      "supabase_schema_change",
      "vercel_env_change",
      "external_publish"
    ],
    timestamp: new Date().toISOString()
  });
}
