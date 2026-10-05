---
description: "Configure the project's QC profile, required skills, paths and constitution policy"
---

# QC setup

User input: $ARGUMENTS (optional local Link skills directory and project context)

1. Locate the project root containing `.specify/`. Read
   `.specify/extensions/qc/references/skill-integration.md` and its project-profiles reference.
   In an extension-source-only folder, show README installation instructions; do not create
   an application project.
2. Inventory the project read-only: surfaces/change modes, current tests/runners/configs,
   package/runtime requirements, existing QC paths and host skill support. Reuse confirmed
   facts and ask only for material unknowns. Browser, native, API, data and manual targets
   have different capabilities. Do not create a Playwright project for an unrelated stack.
3. Merge the constitution QC article if missing, preserving other articles. Record the profile,
   policy values, environment purposes and named owners there. Unresolved values get owner/
   due phase; unsupported categories get justified N/A. Never fabricate approval.
4. Keep review and TC design skills as the common layer. Select CLI skill 3c only for browser
   validation and skill 5 only for supported link-playwright targets; project-runner uses the
   actual repository toolchain. Copy selected complete skill folders from the supplied source
   to the resolved skillsDir (Claude Code default: .claude/skills). Preserve local edits unless
   replacement is authorized; no unrestricted sync and no deleting unrelated installed skills.
   Confirm the host can load the format. Other hosts require verified registration/tool support;
   changing a directory name alone does not port a skill.
5. Validate installed frontmatter. If the review skill still has the known unquoted single-line
   description containing colon-space, quote that identical text in the destination copy and
   validate YAML; preserve the body and canonical source. Report any other parse failure.
6. Merge `templates/qa-manifest-template.json` into the manifest, retaining real paths,
   framework values and unrelated fields. Fill extension-owned qc metadata and selected targets;
   do not leave example values as active config. Create only required directories.
   All legacy steering aliases MUST resolve to the one constitution file. These aliases are
   read-only compatibility inputs, not a reason to run a layer installer or foundation repair.
   Record local-only reporting. For multiple runners, retain separate target configs and pass
   the selected target's actual paths into each run.
7. Create the learning file only if absent with Index, Project Knowledge, Common Flows,
   UI Knowledge (when relevant), Test Data, Locale Knowledge, Automation Tricks and Model Notes.
   Preserve canonical selected-skill model headings and existing knowledge. Merge the QC
   agent-instructions snippet into CLAUDE.md for Claude Code, or a verified host equivalent.
8. Probe only tools selected for this project. For applicable 3c validation use
   `playwright-cli --version`, then `npx --no-install playwright-cli --version`.
   Missing capability is BLOCKED for that route; inapplicable browser tools are N/A.
   No installs during setup. Report exact missing tools/configs and their affected scope.
9. Report profile/targets, installed/missing skills, policy aliases and unresolved configuration.
   Setup is not live validation, automation, deployment or sign-off.
