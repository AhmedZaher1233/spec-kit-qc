---
description: "Check development readiness, current approvals and scoped coverage on every implementation run"
---

# QC gate — before every implementation

Read `.specify/extensions/qc/references/skill-integration.md` and project profiles.
Check all rows every time; a prior PASS never authorizes a changed design.

| Check | PASS condition | Repair |
|---|---|---|
| Policy/profile | Constitution QC article, feature profile, owners and development-phase decisions defined; compatibility aliases valid | qc.setup / qc.plan |
| Review | Current qc-review.md confirms clarify completion and complete story/dependency inventory | clarify then qc.review |
| Freshness | Source/dependency/REQ/technical-plan/policy and selected manifest routing/config snapshots match; no missing/new unreviewed story | qc.review / qc.plan |
| Plan approval | Named human approval/date; approved design-prefix hash matches; applicable policy conflicts resolved | qc.plan + human review |
| Testability | In-scope outcomes are measurable; unresolved questions do not masquerade as expected results | clarify |
| Automation plan | Section 7 chooses a feasible route per target or a justified manual path; proposed interfaces have owner/confirmation point | qc.plan |
| Case approval | Current stories have approved TC/check designs and data requirements; file hashes match actual human approvals | qc.tcs + review |
| Coverage | Every applicable matrix row links relevant case/check IDs; cross-cutting checks mapped without forced duplication per story | qc.tcs / qc.plan |
| Development dependencies | Required testability and dev test work is represented in tasks.md with owners | tasks / analyze |

This is development readiness: no live URL, deployed app, final credentials, CLI installation,
automation PASS or release sign-off is required. Unbuilt test interfaces may be planned as
development work. A manual-only feature does not need an automated suite. Actual execution
readiness is checked before runs; missing business decisions/design remain blockers now.

On FAIL/BLOCKED, name affected scope and the corrective action. A policy-permitted exception
needs scope/reason/risk/owner/approver/expiry and cannot invent an outcome or waive the release
floor. No blanket bypass, manufactured approval or refreshed hash for unreviewed content.
Append gate evidence below Approval Record without changing the approved design.
