# Verification: agent-orchestrator-admin

## Canonical check

Run before every handoff, commit, or PR update:

```
npm run verify
```

`verify` runs the gates in order and fails fast:

1. `format:check` — `prettier --check` over ts/tsx/js/json/md/yml/yaml/css/html.
2. `ts:check` — `tsc --noEmit` (strict).
3. `lint:ci` — `eslint "{src,tests}/**/*.{ts,tsx}" --max-warnings 0`
   (zero warnings allowed).
4. `fsd:check` — `steiger src` (Feature-Sliced Design boundary checks).
5. `test:unit` — `vitest run`.
6. `build` — `react-router build`; must produce `build/server` and `build/client`.

## CI gates (`.github/workflows/ci.yml`)

- `npm ci --ignore-scripts` then `npm run verify`.
- SonarCloud scan with `-Dsonar.qualitygate.wait=true` (uses `SONAR_TOKEN`).
- On pull requests, `npm run sonar:issues:local` inspects open Sonar issues.

## Notes

- Do not loosen `--max-warnings 0`, disable Sonar in CI, or relax Steiger rules
  beyond `fsd/insignificant-slice`.
- Install must be peer-clean; do not use `--legacy-peer-deps`.
- Local SonarCloud runs: copy `.env.sonar.example` to `.env.sonar`, then
  `npm run sonar:local` / `npm run sonar:issues:local` (requires Docker).
