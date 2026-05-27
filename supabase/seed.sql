insert into build_runs (id, title, stage, status)
values ('run-core', 'AUTO BUILDER Control Plane', 'Build and implementation', 'local-ready')
on conflict (id) do nothing;

insert into queue_items (id, build_run_id, title, owner, lane, priority, platform, approval_state, evidence, next_action)
values
  ('q-intake', 'run-core', 'Normalize builder docs into live repo source truth', 'AUTO BUILDER', 'ready', 'critical', 'GitHub', 'approved', 'Attached builder docs and memory files were inspected before implementation.', 'Keep builder docs synchronized with code and validation outputs.'),
  ('q-drive', 'run-core', 'Package operator docs for Drive handoff', 'Operations', 'awaiting-approval', 'high', 'Google Drive', 'pending', 'Drive account is connected, but destination folder is not yet grounded.', 'Confirm target folder or Docs destination before export.'),
  ('q-release', 'run-core', 'Promote sandbox repo into GitHub and Vercel targets', 'Release', 'blocked', 'critical', 'Vercel', 'pending', 'Local build is ready; live sync is blocked by sandbox network constraints.', 'Run remote push and deploy from an environment with GitHub/Vercel write access.')
on conflict (id) do nothing;

