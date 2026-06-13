# agent-orchestrator-admin

Admin UI for the Revisium agent orchestrator. This repository is a child of the
Revisium workspace and follows the canonical agent playbook in the workspace
`./agents` directory.

## Context

- Canonical roles, pipelines, and method live in the workspace `./agents`.
- This file holds only repo-specific facts; it does not redefine roles.
- Repo-local overlays win for concrete commands, paths, policies, and domain
  facts. Canonical roles and pipelines stay in `./agents`.

## Repo-local overlays

- `REPOSITORY.md` — structure and source-of-truth order.
- `VERIFICATION.md` — exact verification commands and quality gates.
- `REVIEW.md` — review policy.
- `docs/adr/` — architecture decision records.

## Required workflow

- Inspect the relevant code before editing.
- Use `VERIFICATION.md` for the canonical local checks.
- Run local verification before commit.
- Check CI, SonarCloud, and review threads after push.

## Boundaries

- No backend, MCP client, network calls, or `@revisium/client` in this app yet.
- xyflow and other DOM-measuring widgets live only in `*.client.tsx` modules and
  are never imported server-side (see `docs/adr/0001`).
- Theme via Chakra props and `system` tokens / `textStyles`; forced light, no
  color-mode toggle.
