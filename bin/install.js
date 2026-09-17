#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const packageRoot = path.resolve(__dirname, '..');
const targetRoot = process.cwd();
const force = process.argv.includes('--force');
const files = [
  '.github/agents/qc.agent.md',
  '.github/skills/qc/SKILL.md'
];

const existingFiles = files.filter((relativePath) =>
  fs.existsSync(path.join(targetRoot, relativePath))
);

if (existingFiles.length > 0 && !force) {
  console.error('The following files already exist:');
  existingFiles.forEach((relativePath) => console.error(`  ${relativePath}`));
  console.error('Re-run with --force to replace them.');
  process.exit(1);
}

for (const relativePath of files) {
  const source = path.join(packageRoot, relativePath);
  const destination = path.join(targetRoot, relativePath);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination);
  console.log(`Installed ${relativePath}`);
}

console.log('qc skill and agent are ready for this workspace.');