---
description: Perform a non-destructive cross-artifact consistency and quality analysis across spec.md, plan.md, tasks.md and the QC artifacts (test-plan.md, TEST-CASES, TEST-DATA) after task generation.
strategy: wrap
---

{CORE_TEMPLATE}

## QC consistency pass (qc preset, constitution QC-3, QC-4, QC-18)

Add these detection passes to the analysis above (read-only; findings join the same report
table with category `QC`; a constitution Quality Control violation is CRITICAL like any other
constitution violation).

**G. Test plan and approval**
- `test-plan.md` missing, `Status` not APPROVED, Approval Record without approver / date / hash,
  or design hash / source hashes not matching the current files → CRITICAL (stale or missing
  approval; re-run `/speckit.plan` and re-approve).
- Any §11 row with Status Open → CRITICAL (QC-3). Business questions still unanswered in spec.md
  → HIGH with the `/speckit.clarify` suggestion.

**H. Traceability (QC-4)**
- A spec FR / SC / acceptance scenario / edge case with no row in test-plan.md §3, or a §3 row
  with no TC ID → HIGH. A §4 row whose TC-ID is absent from `TEST-CASES-<feature>.md` (or the
  reverse), or whose Type / Stage / Smoke / Automation Candidate differ → HIGH (expansion drifted
  from the approved plan).
- `TEST-CASES` / `TEST-DATA` hashes recorded in the Approval Record that do not match the current
  files → MEDIUM (freshness) unless design fields changed → HIGH.
- A `[E]/[A]/[D]` token without a TEST-DATA row, or a literal URL / username / password-shaped
  value in a step → HIGH (QC-7).

**I. Tasks coverage of QC work (QC-18)**
- tasks.md lacks Phase T (testability asks from test-plan.md §9), the per-story developer-test
  tasks, or Phase V (local run, live validation for browser scope, automation for link-playwright
  targets, fix loop, result recording, push after validation) → HIGH. A §9 ask with no task → MEDIUM.
- A Phase V task that names a skill not present under `.claude/skills/` → MEDIUM with the
  `/sync-skills <name>` hint.

**Coverage summary additions**: requirement design coverage (fully / partially / none of ACs,
weighted %), TC count by type, smoke and automation-candidate counts, open-question counts — read
from the TEST-CASES header and §11; never recomputed from guesses. In Next Actions, say whether
`/speckit.implement` may start (no CRITICAL QC finding) and which QC findings block it.
