import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const markdownFiles = [];

function walk(dir) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (item.name === 'node_modules' || item.name === '.next' || item.name === '.git') {
        continue;
      }
      walk(full);
      continue;
    }

    if (item.isFile() && item.name.endsWith('.md')) {
      markdownFiles.push(full);
    }
  }
}

walk(root);

const linkRegex = /\[[^\]]+\]\(([^)]+)\)/g;
const broken = [];

for (const file of markdownFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const dir = path.dirname(file);

  for (const match of content.matchAll(linkRegex)) {
    const target = match[1];
    if (target.startsWith('http') || target.startsWith('#') || target.startsWith('mailto:')) {
      continue;
    }

    const resolved = path.resolve(dir, target);
    if (!fs.existsSync(resolved)) {
      broken.push({ file: path.relative(root, file), target });
    }
  }
}

if (broken.length) {
  for (const entry of broken) {
    console.error(`broken link in ${entry.file}: ${entry.target}`);
  }
  process.exit(1);
}

console.log(`checked ${markdownFiles.length} markdown files: all local links valid`);
