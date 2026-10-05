<!-- Merge into CLAUDE.md for Claude Code, or a verified host's instruction file. -->

## QC workflow (Spec Kit + Link QC)

- Read `.specify/extensions/qc/references/skill-integration.md` and project-profiles.md.
  The constitution QC article is the only policy/config authority. Legacy steering aliases point
  to it; do not load/create separate policy layers or run foundation repair. Use qc.setup.
- Order: specify → clarify → qc.review → plan/qc.plan → tasks/qc.tcs → human design approval
  → analyze/qc.gate → implement → applicable optional CLI validation → selected automation/
  manual execution → evidence review → release decision on the configured target(s).
- Review/design skills 2/3 apply to local requirement files across profiles. Browser validation
  uses CLI skill 3c only; no MCP fallback. No browser surface means tool N/A, not missing-tool FAIL.
- Supported browser automation uses skill 5 with explicit `ado_mode: local`. Other targets use
  their verified project runner or manual procedures; new runner setup must be explicitly planned.
  Never claim native/API/data support
  simply because a browser tool is installed. No Azure publishing/sync even if old mappings exist.
- qc.plan chooses profile/risk, owners, regression and measurable outcomes, then section 7
  records feature strategy, reuse/files, prerequisites, data isolation/cleanup, oracles/groups
  and work order. qc.automate/qc.run-env follow the approved routes; manual-only is valid.
- spec.md is the business oracle. Answers enter it through clarify; QC metadata and hashes
  stay in qc-review.md. Code observations/learning cannot settle missing business decisions.
- Recheck source/design approvals and scope every gate. Development needs planned testability,
  not a deployed app or passing automation. Execution needs current build/data/config/evidence.
- Reuse existing suites and name owners. Preserve formats, HUMAN markers, reference tokens,
  history and real human approval. Tool success/zero tests/skips/unknowns are never acceptance PASS.
- Resolve paths from the manifest; specs/NNN-feature maps to Testing/.../SPEC-NNN-feature.
