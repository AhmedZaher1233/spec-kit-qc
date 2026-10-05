---
description: "Review automation design, code, data lifecycle and evidence for the selected runner"
---

# QC automation review

User input: $ARGUMENTS (feature; optional target ID)

1. Read `.specify/extensions/qc/references/skill-integration.md`, project profiles and approved
   plan section 7. Confirm target mode, runner and current source/TC/config hashes.
2. For link-playwright, read installed **`link-qc-5-test-run-automation`** checkpoint guidance.
   Run its validate-automation.mjs from resolved skillsDir plus semantic review, using actual
   config/inventory flags supported by that installed script. The default skill path is
   `.claude/skills/link-qc-5-test-run-automation/scripts/validate-automation.mjs`.
   Require current A/B evidence; static lint alone is insufficient.
3. For project-runner, use appropriate repository lint/type/build/test-discovery checks and
   semantic review. Record pre-run and post-run results with runner/version and actual commands.
   Do not apply Playwright/POM rules or label these checks Link A/B. Manual-only is N/A with
   planned human evidence; missing required tooling is BLOCKED.
4. Review requirement-to-case mapping, assertions that detect real faults, supported observation
   channels, prerequisites/data ownership, bounded waits, retries/flake handling, cleanup,
   isolation, parallel/serial groups and retained diagnostics. UI locator/POM checks apply
   only to the chosen UI route. Reject unexplained skips/focus and meaningless assertions.
5. Compare actual reuse/files and execution behavior with the approved plan. Log routine
   implementation detail changes; material scope/strategy/data-access changes need reapproval.
   An edited tested file invalidates affected results and requires rerun.
6. Write Automation Review: target, scope, code/config hashes, checks, findings, status,
   reviewer/date and human approval when actually given. Verify post-run artifacts as well as
   code. Future environment runs require current pre-run review; review any changes again.
