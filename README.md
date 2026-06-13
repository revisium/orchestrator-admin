# agent-orchestrator-admin

Admin UI for the Revisium agent orchestrator.

Built with React Router v7 (SSR), Chakra UI v3, MobX, and `@xyflow/react`,
organized with Feature-Sliced Design.

## Getting started

```sh
nvm use            # Node 24.11.1 (see .nvmrc)
npm install        # peer-clean; do not use --legacy-peer-deps
npm run dev        # start the dev server
```

## Common scripts

- `npm run dev` — start the React Router dev server.
- `npm run build` — production build (`build/server` + `build/client`).
- `npm run start` — serve the production build.
- `npm run verify` — full local gate (format, types, lint, FSD, tests, build).

See `VERIFICATION.md` for gate details, `REPOSITORY.md` for structure, and
`docs/adr/` for architecture decisions.
