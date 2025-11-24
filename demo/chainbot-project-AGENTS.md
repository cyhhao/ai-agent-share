# AGENTS.md

Guidance for the Codex agent (GPT-5) when working inside this repository. Keep it handy for build, test, and deployment tasks.

## Quick Shell Rules
- Run commands through `bash -lc "<cmd>"` from the workspace root; avoid mutating global state.
- Prefer `rg` for code search, `go test ./...` for Go suites, and `pnpm`/`npm` as noted per frontend.
- Never touch Kubernetes or production resources from here; limit work to local tooling and CI triggers.

## Build & Test Checklist
- **Go services (`backend-*`, `chainbase-*`, `base-gokit`)**
  - Build: `go build -o service .` or `make build`
  - Tests: `go test ./...` or `make test`
- **chainbot-vite (React/Vite)**
  - Dev: `pnpm dev`
  - Build: `pnpm build` (runs `tsc` + `vite build`)
  - Quality: `pnpm lint`, `pnpm test`
- **frontend-admin (UmiJS + Ant Design)**
  - Dev: `npm run dev`
  - Build: `npm run build` / `npm run build:prod`
  - Format: `npm run format`
- **swapbot-miniapp / wallet-guard (React Native/Expo)**
  - Use standard React Native CLI/Expo commands
- **Hardhat projects (`chainbot-contract`, `contract-deploy-test`)**
  - Compile: `npm run compile`
  - Test: `npm run test`
  - Deploy: `npm run deploy:local`, `npm run deploy:base`
  - Local node: `npm run node`

## Architecture Snapshot
- **backend-api**: Gin-based HTTP API, Auth0 auth, MySQL/Redis/RocketMQ, Telegram bot hooks.
- **backend-driver**: Event-driven monitors for addresses and transactions; configurable per chain.
- **backend-action**: Executes trading and notification workflows triggered by drivers.
- **backend-admin-api**: RBAC-enabled admin endpoints.
- **chainbase-* services**: Wrappers around external blockchain data providers (RPC, DEX, price, name service, block scanner).
- **Frontends**: `chainbot-vite` (user UI), `frontend-admin` (admin dashboard), `swapbot-miniapp`, `wallet-guard`.
- **Shared libs**: `base-gokit` (common Go utilities), `go-ethereum` (patched client), `dev-mcp` (tooling/monitoring).

## Workflow & Deployment
- Work from `dev` or feature branches off `dev`; never commit directly to `master`.
- Local validation before pushing:
  ```bash
  go build -o service .
  npm/pnpm build
  ```
- CI/CD:
  - Push to `dev` ⇒ auto deploys to Kubernetes namespace `chainbot-test` (services use `-test` suffix).
  - To reach prod: merge to `dev`, verify in test, then PR `dev → master`.
- MCP helpers (run via devmcp):
  - Deploy: `mcp__devmcp__ops_github_cli command="workflow run Deploy --repo ChainbotAI/[repo-name] --ref [dev|master] -f env_input=[test|prod]"`
  - Recent workflow status: `mcp__devmcp__ops_github_cli command="run list --repo ChainbotAI/[repo-name] --limit 1 --json status,conclusion,url"`
  - Logs (test): `mcp__devmcp__log_grafana_query source="loki" query='{app="[repo-name]-test"}' limit=100 startTime="now-1h"`
  - Filtered logs: same query with `|= "error"`

## Ops Notes
- Expect ~3 minutes per deployment; monitor via Grafana Loki queries.
- Services run on Kubernetes—stick to read-only diagnostics (`kubectl get`, `logs`) unless explicitly instructed.
- When updating shared libs (e.g., `base-gokit`), tag releases, then bump versions in dependent `go.mod`.

## Mental Checklist Before Finishing
- ✅ Applied the correct build/test commands for the touched component.
- ✅ Accounted for config in `conf/` directories (Go) or env files (frontend).
- ✅ Planned for test deployment in `chainbot-test` before production.
- ✅ Left a note if manual MCP or kubectl follow-up is needed.
