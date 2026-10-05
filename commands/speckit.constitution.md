---
description: Create or update the project constitution, then complete the Quality Control article's project configuration and create the QC project files (Testing/qa-manifest.json, Testing/project-learning.md).
strategy: wrap
---

{CORE_TEMPLATE}

## Quality Control setup (qc preset)

Runs after the constitution has been written above. Scope: the Quality Control article's
configuration and the two QC project files only. No feature artifacts, no application code.

1. **Keep the article.** Confirm `.specify/memory/constitution.md` contains the `## Quality Control`
   article (QC-0 … QC-18 and the "QC project configuration" table) and the `## Development` placeholder article from the resolved template. The Development article is owned by the development team: never fill its DEV-1 … DEV-7 rows from QC input; leave them for the developers and report them as open items. If a
   previous constitution version held a QC article with different wording, merge: rules from the
   template win, project values from the live file are preserved.
2. **Fill the configuration table.** For every `[ ]` row, use in this order: the user's input →
   values already in the live constitution → repository evidence (package manifests, CI files,
   existing Playwright config, i18n configuration, README). Write a real value, `N/A — <reason>`,
   or `Pending — owner <name>, due <stage>`. Never invent an owner, a URL or a threshold; keep the
   "team default" values unless the user changes them. Ask once, in one batch, only for material
   unknowns (QC Lead, surfaces, languages, environments, local run command).
3. **Create `Testing/qa-manifest.json`** from the `qa-manifest-template` (resolve it with the same
   `resolve-template` script, name `qa-manifest-template`) if absent. Reuse an existing manifest:
   add missing keys, never overwrite real paths or framework values. `paths.requirements` and
   `paths.manualTestCases` point at `specs`; every `steering.*` alias points at
   `.specify/memory/constitution.md`; `framework.runner` reflects the actual runner (or
   `manual-only`); `qc.surfaces` lists the declared surfaces. Reuse an existing Playwright project
   as `automationRoot` instead of creating a second one.
4. **Create `Testing/project-learning.md`** from `project-learning-template` if absent (replace the
   project name only). Never rewrite an existing one; add missing sections at their template
   positions.
5. **Check the retained skills** under `.claude/skills/` (or the manifest's `skillsDir`):
   `link-qc-3c-validate-manual-test-cases-cli`, `link-qc-5-test-run-automation`,
   `link-qc-md-to-html`, optional `link-qc-6-ui-testing`. Report each as present or missing with
   the install hint (`/sync-skills <name>`); never install anything here.
6. **Report**: configuration rows filled / pending (with owners), files created or reused, skills
   present / missing, and the next step (`/speckit.specify`). Add the QC files to the suggested
   commit message.
