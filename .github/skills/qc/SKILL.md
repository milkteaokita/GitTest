---
name: qc
description: 'Run lightweight repository quality checks for Markdown and YAML files. Use when reviewing docs, GitHub configuration, issue templates, or preparing a small change for review.'
argument-hint: '檢查目前 repository 的文件與 GitHub 設定'
user-invocable: true
---

# Repository Quality Check

Use this skill to perform a small, repeatable quality check without requiring
local package installation.

## Procedure

1. Inspect the changed files and identify Markdown and YAML files in scope.
2. Run Markdown checks with:

   ```text
   npx --yes markdownlint-cli2@0.17.2 "README.md" ".github/**/*.md"
   ```

3. Run formatting checks for GitHub YAML with:

   ```text
   npx --yes prettier@3.6.2 --check ".github/**/*.yml"
   ```

4. Review failures, fix only issues related to the requested change, and rerun
   the failed command.
5. Report the commands run, their result, and any remaining warnings.

## Guardrails

- Do not install dependencies unless the user asks for package setup.
- Do not modify files automatically during a check.
- Report unmatched globs instead of treating them as failures.
