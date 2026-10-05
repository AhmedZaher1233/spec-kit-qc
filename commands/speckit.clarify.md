---
description: Identify underspecified areas in the current feature spec by asking up to 5 targeted clarification questions, with a QC testability review (constitution QC-5) feeding the question queue and checklists/requirements.md.
strategy: wrap
---

{CORE_TEMPLATE}

## Testability review (qc preset, constitution QC-5)

Runs inside the clarification workflow above: do the review in step 3 (the ambiguity scan) so
its findings compete for the five question slots, and finish with the checklist update.

1. **Review spec.md text only.** Do not open plan.md, contracts, data models or code — this is a
   requirements review. Rate each user story on the six dimensions of QC-5 (Completeness,
   Clarity, Testability, Consistency, Feasibility, Risk) and assign the story risk
   (High / Medium / Low) using the QC-5 definitions. Treat items already answered under
   `## Clarifications` as settled; never re-raise them.
2. **Follow requirement dependencies** named in the spec (other specs, glossary, role matrix) up
   to two levels; a dependency that cannot be read is reported as Unresolved and the acceptance
   criteria that rely on it are rated Risky at best.
3. **Add candidates to the question queue.** Each testability gap becomes a candidate question in
   the same shape as the core workflow (full interrogative, "Why it matters", recommended option).
   Prioritise, in order: acceptance criteria without a deterministic pass/fail outcome; missing
   entry point / where results become visible; roles that can and cannot act; lookup-driven fields
   without a management path; state transitions and concurrent-user behaviour; boundaries (empty,
   maximum length, special characters, ranges); error flows and recovery; vague adjectives. Only
   gaps that change how the feature will be tested qualify; business-rule gaps are asked the same
   way and their answers land in spec.md through the core integration step.
4. **Update `checklists/requirements.md`.** Under a `## Testability (QC-5)` heading add one item
   per dimension that is not yet satisfied, in the core checklist format
   (`- [ ] CHK### <criterion> [Spec §…]` / `[Gap]`), plus one `Story risk: USn — High/Medium/Low —
   <why>` line per story. Mark `[x]` only items this session's answers actually closed. Never
   write a separate review file and never add QC metadata to spec.md.
5. **Report** in the completion summary: per-story risk, dimensions still open, dependencies
   Found / Unresolved, and whether the spec is ready for `/speckit.plan` (every acceptance criterion
   testable) or needs another clarify round.
