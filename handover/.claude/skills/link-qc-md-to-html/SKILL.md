---
name: link-qc-md-to-html
description: "Render any QC Markdown document of a Spec Kit feature to an HTML page, each file independently, with the renderer that owns its format: TEST-CASES-{feature}.md → TC-REVIEW-{feature}.html (skill 3/3c review page), TEST-RUN-REPORT-{feature}.md + BUG-REPORT-{feature}.md → TEST-RUN-REPORT-{feature}.html (skill 5 run report), and every other QC Markdown file (test-plan.md, TEST-DATA-{feature}.md, a bug report on its own, notes) → {file}.html in the same report shell. Deterministic, zero dependencies, never hand-written HTML. Trigger on: 'render the test plan', 'convert to HTML', 'make the review page', 'md to html', 'HTML report for specs/NNN-feature', '/link-qc-md-to-html <file or folder>'."
allowed-tools: Read, Glob, Bash(node *convert.mjs*), Bash(node *render-tc-review.mjs*), Bash(node *render-run-report.mjs*), Bash(node *render-markdown.mjs*)
argument-hint: "<file.md | feature folder> [more…] [--lang en|ar] [--dry-run] [--force] [--only tc|run|md]"
---

# link-qc-md-to-html — QC Markdown → HTML pages

You convert QC Markdown documents into HTML pages by running the scripts in this folder. You never
write HTML by hand, never edit the Markdown, and never invent a number: every page is rendered by
a deterministic script that recomputes its figures from the document's own tables.

## What renders what

| Input (by file name) | Renderer | Output beside the input |
|---|---|---|
| `TEST-CASES-{feature}.md` (+ `TEST-DATA-{feature}.md`, `TC-REVIEW-STRINGS-{feature}.ar.json`, `REVIEW-COMMENTS-{feature}.md` when present) | `scripts/render-tc-review.mjs` — byte-identical mirror of the renderer in `link-qc-3c-validate-manual-test-cases-cli` | `TC-REVIEW-{feature}.html` |
| `TEST-RUN-REPORT-{feature}.md` (+ `BUG-REPORT-{feature}.md`, `.runs/phase-N.json`, `REVIEW-COMMENTS-{feature}.md`) | `scripts/render-run-report.mjs` — mirror of the renderer in `link-qc-5-test-run-automation` | `TEST-RUN-REPORT-{feature}.html` |
| `BUG-REPORT-{feature}.md` with its run report beside it | the run-report renderer (one combined page: Test Results + Bugs) | same page as above |
| `test-plan.md`, `TEST-DATA-{feature}.md`, a lone `BUG-REPORT-*.md`, any other `.md` | `scripts/render-markdown.mjs` — generic Markdown → the same report shell (header lines become meta items, the Status / Environment / Bugs line becomes the banner, `##` headings a table of contents) | `{file}.html` |

All three use `assets/report-shell.template.html`, the one general report page (theme toggle,
reviewer-comment boxes that save `REVIEW-COMMENTS-{page}.md`, screenshot viewer, RTL-ready CSS).
Skipped on purpose: `REVIEW-COMMENTS-*.md`, `TC-REVIEW-STRINGS-*.ar.json`, `TC-GENERATION-SUMMARY.md`,
`automation-inventory.md`.

## Procedure

1. **Resolve the targets.** A file path renders that file; a folder renders every `.md` in it (top
   level only). With no argument, ask once which feature folder (`specs/<NNN-feature>/`) to render.
2. **Run the converter from the project root** (it writes by default; the Markdown is read-only):

   ```bash
   node .claude/skills/link-qc-md-to-html/scripts/convert.mjs specs/<NNN-feature> --pretty
   node .claude/skills/link-qc-md-to-html/scripts/convert.mjs specs/<NNN-feature>/test-plan.md --pretty
   node .claude/skills/link-qc-md-to-html/scripts/convert.mjs <path> --dry-run --pretty      # parse + validate only
   node .claude/skills/link-qc-md-to-html/scripts/convert.mjs <path> --lang ar --pretty      # Arabic page (TC pages need the strings sidecar)
   ```

   Read the JSON payload, never the HTML. Per page: `gate`, `gateReason`, `writes[]`, `warnings[]`,
   `errors[]`, `mismatches`, `refused`.
3. **Act on the gate.**

   | Gate | Meaning | What you do |
   |---|---|---|
   | `PASS` | consistent, written | report the page path |
   | `MISMATCH` | a header count disagrees with the tables (TC / run report) — page written with a warning strip | fix the header line in the Markdown (the payload names it), re-run |
   | `BLOCKED` | nothing written: out-of-vocabulary value, broken table row, missing frozen field, password-shaped literal, or a hand-edited existing page | fix the Markdown and re-run; for a hand-edited page confirm with the user, then `--force` |
   | `NOT_RUN` | path not found / no payload | fix the path |

   Clear warnings before delivery when they are about the source: `data-literal` (a URL / username
   repeated in a TC step — reference `[E{n}]` / `[A{n}]`), `data-ref-unresolved` (a token without a
   TEST-DATA row), `narrative-not-english`, `placeholders` (template tokens such as `{YYYY-MM-DD}` or
   `[PENDING]` still in a plan — fine for a draft, say so).
4. **Arabic pages.** `--lang ar` renders the shell in Arabic (RTL). A TC page additionally needs
   `TC-REVIEW-STRINGS-{feature}.ar.json`; derive it with `node scripts/render-tc-review.mjs --tc <file>
   --lang ar --write-skeleton`, fill only the `ar` values that are `null` or `stale`, then convert
   again. An incomplete translation is delivered as a clearly marked PREVIEW, never as the Arabic page.
5. **Report**: one line per page (`PASS · TC-REVIEW-x.html` …), the warnings you cleared or left,
   and how the reviewer comments on the page (`Save comments` writes `REVIEW-COMMENTS-{page}.md`
   beside the page; the owning command or skill reads it on its next run).

## Rules

- Rendering is idempotent: same inputs → same bytes. Re-rendering is always safe; a page carrying a
  different renderer's provenance or a hand edit is refused without `--force`.
- This skill writes only `.html` pages (and, on request, the Arabic strings sidecar). It never
  changes a Markdown document, never fixes a count by hand, never runs an application.
- No secret is ever rendered: a password-shaped literal in the source blocks the page.
- Policy lives in the constitution's Quality Control article (QC-13: HTML comes only from these
  renderers). Formats of the documents are defined by the preset templates (`test-plan-template`,
  `test-cases-template`, `test-data-template`) and by skill 5's run-report reference.
