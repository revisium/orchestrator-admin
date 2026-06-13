# Repository: agent-orchestrator-admin

Admin UI for the Revisium agent orchestrator. React Router v7 (SSR), Chakra UI v3,
MobX, `@xyflow/react`, organized with Feature-Sliced Design (FSD).

## Stack

- React 19 + React Router v7 in SSR mode (`react-router.config.ts`).
- Chakra UI v3 + Emotion; forced-light via Chakra props/system tokens (no color-mode toggle).
- MobX + `mobx-react-lite` for view models; DI via `src/shared/lib/DIContainer`.
- `@xyflow/react` for run-progress graphs, isolated to `*.client.tsx` modules.
- Vite 7 build; Vitest for unit tests; ESLint + Prettier + Steiger (FSD) gates.

## Layout (FSD)

```text
src/
  root.tsx                 App shell: Chakra forced light, ErrorBoundary
  routes.ts                Route table (layout + all page routes)
  routes/                  Thin RR7 route modules (render page components)
  pages/                   Page slices (ui/ + index.ts), presentational only
    dashboard/ runs-board/ run-create/ run-detail/
    inbox/ inbox-item/
    method-roles/ method-role-detail/ method-pipelines/
    method-pipeline-detail/ method-playbooks/ run-graph-smoke/
  widgets/                 Composite UI slices (ui/ + index.ts)
    Layout/                Nav shell with <Outlet/>
    RunCard/ RunsBoard/ CreateRunWizard/ CostPanel/
    InboxList/ GateResolutionPanel/
    RolesList/ PipelinesList/ PlaybooksList/
    RunProgressGraph/ RoutePreviewGraph/ PipelineGraph/  xyflow DAGs (*.client.tsx)
  shared/
    lib/                   DIContainer, hooks (useViewModel/useService/useHydrated)
    ui/                    Theme, status tokens, presentational atoms, Toaster
    fixtures/              Static prototype data modeled on the control-plane schema
```

Every slice exposes a `ui/` segment and an `index.ts` public API. Cross-slice
imports go through `index.ts`, enforced by Steiger.

## Client-only boundary

DOM-measuring / browser-only widgets (xyflow) live in `*.client.tsx`, which React
Router v7 excludes from the server bundle. A thin `*.tsx` wrapper renders an
SSR-safe placeholder and mounts the `.client` module after hydration. Never import
a `.client` module from a route loader or any server-reachable module. See
`docs/adr/0001-ssr-engine-and-client-only-graphs.md`.

## Source of truth (order)

1. `docs/adr/` — architecture decisions.
2. `VERIFICATION.md` — gate commands.
3. `REVIEW.md` — review policy.
4. This file — structure and conventions.
5. Workspace `./agents` — canonical roles, pipelines, method.
