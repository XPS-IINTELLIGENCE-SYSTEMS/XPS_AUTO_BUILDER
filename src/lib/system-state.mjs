export const systemSnapshot = {
  systemName: "XPS AUTO BUILDER",
  validatedAtUtc: "2026-05-27T00:00:00Z",
  currentStage: "Validation, governance, and optimization",
  currentStatus: "Sandbox-first control plane implemented locally, tested, and staged for remote promotion.",
  sourceTruth: {
    builderDocs: "Attached builder-doc set in /workspace/agent_files/builder-docs",
    memory: "AUTO BUILDER memory files in /workspace/memory",
    repoTarget: "XPS-IINTELLIGENCE-SYSTEMS/XPS_AUTO_BUILDER"
  },
  verified: [
    {
      label: "GitHub",
      status: "connected",
      detail: "Authenticated user xps-admin; target repository XPS-IINTELLIGENCE-SYSTEMS/XPS_AUTO_BUILDER exists."
    },
    {
      label: "Vercel",
      status: "connected",
      detail: "Project auto-builder exists with production domain auto-builder-livid.vercel.app."
    },
    {
      label: "Supabase",
      status: "connected",
      detail: "Project Strategic Minds Advisory is ACTIVE_HEALTHY in us-east-2."
    },
    {
      label: "Google Drive",
      status: "connected",
      detail: "Account Jeremy / strategicmindsadvisory@gmail.com is connected."
    }
  ],
  inferred: [
    "The validated local repo should map to the existing GitHub and Vercel targets once network write access is available.",
    "Google Drive should receive exported docs and operator packets after the destination folder is confirmed."
  ],
  couldNotVerify: [
    "Direct GitHub clone, push, or pull from this sandbox.",
    "Live Vercel deploy from this run.",
    "Live Supabase migration execution from this run.",
    "Direct Google Drive writeback destination for final artifacts.",
    "Direct Xyla execution in the current runtime."
  ],
  integrations: {
    github: {
      repository: "XPS-IINTELLIGENCE-SYSTEMS/XPS_AUTO_BUILDER",
      owner: "XPS-IINTELLIGENCE-SYSTEMS",
      defaultBranch: "main",
      visibility: "public"
    },
    vercel: {
      teamId: "team_aFdds8lsbHMwe2ip4aQdbQ3d",
      projectId: "prj_qaUnGOL4MmPvm11Hqxp9Cn0YDfmv",
      projectName: "auto-builder",
      domains: [
        "auto-builder-livid.vercel.app",
        "auto-builder-strategic-minds-advisory.vercel.app",
        "auto-builder-git-main-strategic-minds-advisory.vercel.app"
      ]
    },
    supabase: {
      projectId: "prhppuuwcnmfdhwsagug",
      projectName: "Strategic Minds Advisory",
      region: "us-east-2",
      url: "https://prhppuuwcnmfdhwsagug.supabase.co"
    },
    googleDrive: {
      accountEmail: "strategicmindsadvisory@gmail.com",
      candidateAssets: [
        "SWF_Universal_AutoBuild_Workbook_OS",
        "SMA One-and-Done AutoBuild Template System",
        "SMA_Enterprise_AutoBuild_OS_Ceiling_v2.xlsx"
      ]
    }
  },
  bridge: {
    name: "Autonomous GPT Bridge",
    objective: "Route blocked live actions into guided fallback tasks, approval queues, and operator handoff packets.",
    blockerRoutes: [
      {
        blocker: "GitHub remote sync unavailable from sandbox",
        fallback: "Create remote-ready release branch plan, PR body, and file manifest inside repo."
      },
      {
        blocker: "Vercel deploy not executed from sandbox",
        fallback: "Ship deployment contract, project IDs, cron config, and post-deploy validation steps."
      },
      {
        blocker: "Supabase migration not applied live",
        fallback: "Ship migration SQL, seed data, and exact apply order."
      },
      {
        blocker: "Drive destination unresolved",
        fallback: "Stage docs pack and wait at explicit export gate."
      }
    ]
  }
};

export const defaultQueueItems = [
  {
    id: "q-intake",
    title: "Normalize builder docs into live repo source truth",
    owner: "AUTO BUILDER",
    lane: "ready",
    priority: "critical",
    platform: "GitHub",
    approvalState: "approved",
    evidence: "Attached builder docs and memory files were inspected before implementation.",
    nextAction: "Keep builder docs synchronized with code and validation outputs."
  },
  {
    id: "q-drive",
    title: "Package operator docs for Drive handoff",
    owner: "Operations",
    lane: "awaiting-approval",
    priority: "high",
    platform: "Google Drive",
    approvalState: "pending",
    evidence: "Drive account is connected, but destination folder is not yet grounded.",
    nextAction: "Confirm target folder or Docs destination before export."
  },
  {
    id: "q-release",
    title: "Promote sandbox repo into GitHub and Vercel targets",
    owner: "Release",
    lane: "blocked",
    priority: "critical",
    platform: "Vercel",
    approvalState: "pending",
    evidence: "Local build is ready; live sync is blocked by sandbox network constraints.",
    nextAction: "Run remote push and deploy from an environment with GitHub/Vercel write access."
  }
];

export const defaultApprovals = [
  {
    id: "a-001",
    subject: "Drive export destination",
    status: "pending",
    severity: "medium",
    rule: "Required before publishing final docs to Google Drive."
  },
  {
    id: "a-002",
    subject: "Live deployment promotion",
    status: "pending",
    severity: "high",
    rule: "Required before pushing sandbox build to GitHub and Vercel production."
  }
];
