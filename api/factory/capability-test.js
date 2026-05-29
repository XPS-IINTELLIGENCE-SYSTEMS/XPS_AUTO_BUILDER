const capabilityTests = [
  {
    id: "CAP-001",
    surface: "Idea Router",
    objective: "Classify sample ideas into valid one-hour routes",
    successSignal: "Route confidence >= 80 or clean escalation",
    fallback: "Human route review"
  },
  {
    id: "CAP-002",
    surface: "Template Factory",
    objective: "Assemble build packets from template bundles",
    successSignal: "Required modules mapped with no missing core pack",
    fallback: "Generic scaffold packet"
  },
  {
    id: "CAP-003",
    surface: "Connector Ops",
    objective: "Measure direct mutation versus fallback receipt for every connector",
    successSignal: "Readiness state and workaround logged",
    fallback: "Manual bridge packet"
  },
  {
    id: "CAP-004",
    surface: "Reverse Engineering",
    objective: "Capture public architecture, workflows, offers, assets, and signals from target systems",
    successSignal: "Evidence pack, diff log, template extraction, and risk classification created",
    fallback: "Research-only mode"
  },
  {
    id: "CAP-005",
    surface: "Hardening",
    objective: "Run universal hardening profile before release recommendation",
    successSignal: "Required tests all pass or exact patch list produced",
    fallback: "Hold release"
  }
];

export default function handler(_request, response) {
  response.status(200).json({
    ok: true,
    source: "auto-builder-app-mcp",
    surface: "/api/factory/capability-test",
    tests: capabilityTests,
    timestamp: new Date().toISOString()
  });
}
