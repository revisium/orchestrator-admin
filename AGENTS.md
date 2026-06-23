# orchestrator-admin

Admin UI for the Revisium agent orchestrator. This repository is a child of the
Revisium workspace and follows the canonical agent playbook in the workspace
`../agent-playbook` directory.

## Context

- Canonical roles, pipelines, and method live in the workspace
  `../agent-playbook`.
- This file holds only repo-specific facts; it does not redefine roles.
- Repo-local overlays win for concrete commands, paths, policies, and domain
  facts. Canonical roles and pipelines stay in `../agent-playbook`.

## Repo-local overlays

- `REPOSITORY.md` — structure and source-of-truth order.
- `VERIFICATION.md` — exact verification commands and quality gates.
- `REVIEW.md` — review policy.
- `docs/adr/` — architecture decision records.

## Selected playbook references

Use these references from `../agent-playbook` for this repository:

- `references/quality/readable-code.md`
- `references/quality/idiomatic-code.md`
- `references/quality/minimal-sufficient-code.md`
- `references/quality/verification.md`
- `stacks/js-ts/references/idiomatic-js-ts.md`
- `stacks/js-ts/references/react-mobx-mvvm.md`
- `stacks/js-ts/references/react-ui-boundary.md`
- `stacks/js-ts/references/mvvm-frontend.md`
- `stacks/js-ts/references/mobx-reactivity.md`
- `stacks/js-ts/references/frontend-di-composition.md`
- `stacks/js-ts/references/frontend-fsd.md`
- `stacks/js-ts/references/graphql-api.md`
- `stacks/js-ts/references/verification.md`

## Required workflow

- Inspect the relevant code before editing.
- Use `VERIFICATION.md` for the canonical local checks.
- When GraphQL operations, schema snapshots, generated SDK, or GraphQL services
  change, run the GraphQL checks in `VERIFICATION.md` before broader `verify`.
- Run local verification before commit.
- Check CI, SonarCloud, and review threads after push.

## Boundaries

- Use same-origin `/graphql` for backend access. Local development proxies that
  path to `revo serve`; production embedding mounts GraphQL on the same host.
- Keep GraphQL transport in `src/shared/api/graphql`. Feature/page code must go
  through service/view-model classes registered in `src/shared/lib/DIContainer`;
  do not call generated SDK methods from React components.
- React components render state and wire events only. Components may derive
  trivial display text, but loading, refresh, expected failures, and product
  visible state transitions belong in services or MobX view models.
- Use MobX view models for live admin state. Components observe view models via
  `useViewModel`; view models own observable state, derived state, UI actions,
  and lifecycle. Services own IO and generated clients.
- Follow the existing DI boundary. Concrete services and view models are
  registered in `src/shared/lib/DIContainer`; units that need tests should
  accept dependencies through constructors instead of reading globals directly.
- Preserve Feature-Sliced Design import direction. Shared API/client code stays
  in `shared`, domain read models/services in `entities`, user actions in
  `features`, composed blocks in `widgets`, and routes/screens in `pages`.
- Check in `src/__generated__/schema.graphql` and
  `src/__generated__/graphql-request.ts`. Treat generated drift as a failing
  quality gate, not as an optional local artifact.
- Do not import `@revisium/client` or read Revisium/DBOS state directly from the
  admin app.
- xyflow and other DOM-measuring widgets live only in `*.client.tsx` modules and
  are never imported server-side (see `docs/adr/0001`).
- Theme via Chakra props and `system` tokens / `textStyles`; forced light, no
  color-mode toggle.
