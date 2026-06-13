# Repository: agent-orchestrator-admin

Admin UI for the Revisium agent orchestrator. React Router v7 (SSR), Chakra UI v3,
MobX, `@xyflow/react`, organized with Feature-Sliced Design (FSD).

## Stack

- React 19 + React Router v7 in SSR mode (`react-router.config.ts`).
- Chakra UI v3 + Emotion; forced-light color mode via `next-themes`.
- MobX + `mobx-react-lite` for view models; DI via `src/shared/lib/DIContainer`.
- `@xyflow/react` for run-progress graphs, isolated to `*.client.tsx` modules.
- Vite 7 build; Vitest for unit tests; ESLint + Prettier + Steiger (FSD) gates.

## Layout (FSD)

```
src/
  root.tsx                 App shell: Chakra + next-themes forced light, ErrorBoundary
  routes.ts                Route table (layout + index + smoke route)
  routes/                  Thin RR7 route modules (render page components)
  pages/                   Page slices (ui/ + index.ts)
    home/
    run-graph-smoke/
  widgets/                 Composite UI slices (ui/ + index.ts)
    Layout/                Presentational nav shell with <Outlet/>
    RunProgressGraph/      xyflow DAG smoke probe (client-only boundary)
  shared/
    lib/                   DIContainer, hooks (useViewModel/useService/useHydrated), helpers
    ui/                    Theme system (theme/globalCss/textStyles), Toaster
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
