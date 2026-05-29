const routes = [
  {
    lane: "website",
    destination: "frontend-live-bridge",
    allowed: true,
    approvalRequired: false,
    next: "serve and validate Eden content-factory UI"
  },
  {
    lane: "content",
    destination: "draft-content-queue",
    allowed: true,
    approvalRequired: false,
    next: "create review-ready social drafts"
  },
  {
    lane: "media",
    destination: "sandbox-media-packet",
    allowed: true,
    approvalRequired: false,
    next: "prepare briefs and safe generation prompts"
  },
  {
    lane: "commerce",
    destination: "shopify-write-gate",
    allowed: false,
    approvalRequired: true,
    next: "hold until explicit Shopify mutation approval"
  },
  {
    lane: "payments",
    destination: "stripe-write-gate",
    allowed: false,
    approvalRequired: true,
    next: "hold until explicit Stripe action approval"
  },
  {
    lane: "database",
    destination: "supabase-schema-gate",
    allowed: false,
    approvalRequired: true,
    next: "hold until explicit Supabase schema approval"
  },
  {
    lane: "publishing",
    destination: "external-publish-gate",
    allowed: false,
    approvalRequired: true,
    next: "hold until explicit external publishing approval"
  }
];

export default function handler(request, response) {
  const lane = request.query?.lane;
  const matched = lane ? routes.find((route) => route.lane === lane) : null;

  response.status(200).json({
    ok: true,
    source: "auto-builder-app-mcp",
    surface: "/api/factory/router",
    route: matched || null,
    routes,
    timestamp: new Date().toISOString()
  });
}
