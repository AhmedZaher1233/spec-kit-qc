---
description: "Review clarified requirements with link-qc-2-review-requirements"
---

# QC requirement review — after clarify

User input: $ARGUMENTS (feature/spec path; optional --lang ar|en)

Runs from `after_clarify`, never immediately after specify. A further clarification round
runs review again after its answers have been saved.

1. Read `.specify/extensions/qc/references/skill-integration.md`. Resolve one feature, its
   `spec.md`, the constitution QC article, manifest and existing requirement-quality checklist.
   Confirm clarify completed for this revision; no remaining ambiguity is a valid clarify
   outcome even when it created no Clarifications section.
2. Invoke **`link-qc-2-review-requirements`** with the exact spec file and the adapter instructions.
   Keep its current six requirement-review dimensions, including requirement-level feasibility
   and risk. Technical feasibility belongs to plan/research; do not feed those files into this
   review. Resolve requirement dependencies and cross-story contradictions; reference already
   reported checklist issues rather than duplicating them.
3. Use `SPEC-<NNN-feature>/US-<id>-<name>` grouping. Each derived REQ-ID must map to its source
   FR/SC/USn-ACm/edge-case identifier; preserve spec IDs and use explicit stable references for
   unnumbered acceptance scenarios. Recommended ACs remain proposals.
4. Return open business/testability questions for `/speckit.clarify` (highest risk first,
   up to five per round). Do not answer them from the implementation or silently accept a
   suggestion. Resolved answers must enter spec.md before another review.
5. Without changing spec.md, stamp the final source hash into the derived REQ headers and write
   `specs/<feature>/qc-review.md` per the integration reference. Include story inventory,
   dependency hashes, output paths, source-to-REQ mappings, the clarify-completion record and
   `Review status: READY` or `NEEDS CLARIFICATION`. Retain unresolved dependency findings.
6. On re-review, compare the previous inventory and flag changed/removed stories and affected
   TCs/test-plan rows for revision and human reapproval. Preserve existing approved TCs;
   never regenerate them as a side effect of review.
