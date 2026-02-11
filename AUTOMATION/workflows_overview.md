# Automation and CI Overview

## Workflows

- `ci.yml`
  - npm ci
  - lint
  - build

- `python-templates.yml`
  - installs each template requirements
  - runs template tests

- `docs-lint.yml`
  - markdown style checks (basic)
  - internal link checks (simple grep for broken local refs)

## Why It Exists

These workflows keep curriculum, code, and template examples shippable for every contributor.
