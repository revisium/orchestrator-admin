# orchestrator-admin

Admin UI for the Revisium agent orchestrator.

Built with React Router v7 (SSR), Chakra UI v3, MobX, and `@xyflow/react`,
organized with Feature-Sliced Design.

## Getting started

```sh
nvm use            # Node 24.11.1 (see .nvmrc)
corepack enable
pnpm install       # peer-clean; do not use --legacy-peer-deps
pnpm run dev       # start the React Router dev server
```

## Local development with backend

The admin uses same-origin GraphQL paths in development:

- browser HTTP: `/graphql`;
- browser websocket: `/graphql`;
- Vite proxies both HTTP and WS to the local `revo serve` GraphQL host.

Default local ports:

| Process             | URL                              |
| ------------------- | -------------------------------- |
| Admin dev server    | `http://127.0.0.1:5173/`         |
| GraphQL host        | `http://127.0.0.1:19323/graphql` |
| Revisium daemon     | `http://127.0.0.1:19322/`        |
| Embedded PostgreSQL | `127.0.0.1:15540`                |

Start everything for UI development:

```sh
pnpm run dev:full
```

Or run the backend pieces explicitly:

```sh
pnpm run backend:start   # start Revisium daemon and bootstrap control-plane tables
pnpm run backend:serve   # start GraphQL HTTP + graphql-ws on :19323
pnpm run dev             # start React Router dev server with /graphql proxy
pnpm run backend:stop    # stop the repo-local Revisium daemon
```

The backend data lives under `.revo/dev` by default. This keeps local UI
development separate from the dogfooding daemon under `~/.revisium-orchestrator`.

Useful overrides:

```sh
REVO_CLI=../agent-orchestrator/bin/revo.js pnpm run dev:full
REVO_DEV_PORT=19422 REVO_DEV_GRAPHQL_PORT=19423 REVO_DEV_PG_PORT=15640 pnpm run dev:full
REVO_ADMIN_GRAPHQL_TARGET=http://127.0.0.1:19423 pnpm run dev
REVO_DEV_KEEP_BACKEND=1 pnpm run dev:full
```

## Common scripts

- `pnpm run dev` — start the React Router dev server.
- `pnpm run dev:full` — start repo-local backend, GraphQL host, and admin dev server.
- `pnpm run backend:start` — start and bootstrap the repo-local Revisium daemon.
- `pnpm run backend:serve` — start GraphQL HTTP + websocket host.
- `pnpm run backend:stop` — stop the repo-local Revisium daemon.
- `pnpm run build` — production SSR build (`build/server` + `build/client`).
- `pnpm run start` — serve the production build.
- `pnpm run verify` — full local gate (format, types, lint, FSD, tests, build).

## Embedded SSR package contract

The published package is `@revisium/orchestrator-admin`. Its production build is
prepared for embedding into `@revisium/orchestrator`:

```text
build/server/index.js   # React Router SSR server bundle
build/client/**         # browser assets
```

The orchestrator host should own the single HTTP server, mount GraphQL before the
admin fallback, and serve the admin on the same origin:

```text
/graphql  -> Yoga HTTP + graphql-ws
/assets   -> admin client assets
/*        -> React Router SSR
```

See `VERIFICATION.md` for gate details, `REPOSITORY.md` for structure, and
`docs/adr/` for architecture decisions.
