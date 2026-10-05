---
description: "Assess actual manual and automated evidence against the project's QC release criteria"
---

# QC execution and sign-off

User input: $ARGUMENTS (feature; configured environment/target; build or artifact identity)

1. Read `.specify/extensions/qc/references/skill-integration.md`, project profiles, current spec,
   plan/TC approvals and test results. Match evidence to the intended release scope and artifact.
   Review configuration, readiness, applicability and risks; missing evidence remains BLOCKED.
2. Build the human run list from Manual or Mixed methods, Automation Candidate NO, partial/
   HUMAN outcomes and the automation remainder. Include required nonfunctional/operator checks.
   Manual testing may verify a CLI, dataset, package or device; do not invent a browser journey.
3. Execute or collect actual tester evidence for the approved project-specific checklist and
   regression selection. Use only applicable browser/device/locale/performance/security checks.
   Record targets, configurations, tester/date and authorization; no assumed human execution.
4. Per required case/check and variant, record PASS / FAIL / BLOCKED / NOT RUN / N/A with evidence
   or justification. All required variants must pass for a case PASS. Preserve earlier failed
   attempts and successful retests separately. Never convert N/A/unknown/skip to PASS.
   Defects include source expectation, actual observation, repro, severity/priority and evidence.
5. Aggregate across all relevant targets/build/config/data versions. Missing stages, failing
   lower-level required checks, regression gaps, incomplete cleanup or unsupported outcomes
   stay visible. Do not sum unlike coverage measures or double-count shared requirement tests.
6. Write `specs/<feature>/qc-signoff.md`: scope/versions, configuration and coverage denominators,
   automated/manual results, regression, nonfunctional checks, open defects/risks/deferrals,
   unexecuted scope, UAT/operator acceptance when needed and per-criterion GO/NO-GO.
   Enforce the constitution floor for current in-scope ACs and required checks; apply web/native
   or other metrics only to the profile where they are required.
7. Any missing/failed mandatory criterion means NO-GO. Record permitted Medium/Low deferrals with
   owner/date and actual QC lead/release-owner approval. Present a recommendation first; record
   human release approval only when given. No automatic deployment or external result sync.
