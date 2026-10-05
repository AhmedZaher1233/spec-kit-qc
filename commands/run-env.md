---
description: "Execute the reviewed suite on a configured project environment and retain local results"
---

# QC execution on a configured target

User input: $ARGUMENTS (feature; required environment ID; optional target ID/build)

1. Read `.specify/extensions/qc/references/skill-integration.md`, project profiles and current
   plan/approvals. Resolve an actual configured environment; qc/stg are aliases only if defined.
   A target may be a service, package/runtime, job/dataset, native device or sandbox, not a URL.
2. Check scope/build/config/data identity, target health, dependencies, permissions, setup and
   cleanup. Previous environment readiness does not transfer automatically. Missing relevant
   values block dependent execution. Honor nonproduction/load/security and mutation boundaries.
3. Route the reviewed suite by the plan:
   - link-playwright: invoke **`link-qc-5-test-run-automation`** with the approved plan,
     environment/paths, policy and explicit `ado_mode: local`. Keep its stage/run-group,
     checkpoints and reporters; headless only when requested or documented as necessary.
   - project-runner: use the verified scoped command/config and working directory for that
     environment; retain native output and the target-aware local result summary.
   - manual-only: hand off to qc.execute and report automated execution N/A.
   - missing route/tool/access: BLOCKED for dependent tests, not skipped-as-passed.
4. Keep business expectations fixed. Repairs invalidate affected code review/results and need
   reruns. Differences between environments are findings, not permission to weaken assertions.
5. Append environment/build/config/data identity, target, scope, attempts/variant counts,
   failures/blocked/not-run, runner-specific review status, cleanup and report links to the plan.
   Preserve prior results. No upstream external synchronization, publication or deployment.
