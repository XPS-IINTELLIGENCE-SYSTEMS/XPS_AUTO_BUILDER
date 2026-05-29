export default function handler(_request, response) {
  response.status(200).json({
    ok: true,
    service: "eden-content-factory-frontend",
    surface: "vercel-health",
    productionSafe: true,
    protectedActions: [
      "shopify_writes",
      "stripe_actions",
      "supabase_schema_changes",
      "vercel_env_changes",
      "external_publishing"
    ],
    timestamp: new Date().toISOString()
  });
}
