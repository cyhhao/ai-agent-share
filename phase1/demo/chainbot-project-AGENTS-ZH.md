# AGENTS.md

当 Codex 代理（GPT-5）在此仓库中工作时的指导。请随时查阅以完成构建、测试和部署任务。

## 快速 Shell 规则
- 从工作区根目录通过 `bash -lc "<cmd>"` 运行命令；避免改变全局状态。
- 优先使用 `rg` 进行代码搜索，使用 `go test ./...` 进行 Go 测试套件，并根据前端项目使用 `pnpm`/`npm`。
- 永远不要从这里接触 Kubernetes 或生产资源；仅限于本地工具和 CI 触发器。

## 构建与测试检查清单
- **Go 服务（`backend-*`、`chainbase-*`、`base-gokit`）**
  - 构建：`go build -o service .` 或 `make build`
  - 测试：`go test ./...` 或 `make test`
- **chainbot-vite（React/Vite）**
  - 开发：`pnpm dev`
  - 构建：`pnpm build`（运行 `tsc` + `vite build`）
  - 质量检查：`pnpm lint`、`pnpm test`
- **frontend-admin（UmiJS + Ant Design）**
  - 开发：`npm run dev`
  - 构建：`npm run build` / `npm run build:prod`
  - 格式化：`npm run format`
- **swapbot-miniapp / wallet-guard（React Native/Expo）**
  - 使用标准 React Native CLI/Expo 命令
- **Hardhat 项目（`chainbot-contract`、`contract-deploy-test`）**
  - 编译：`npm run compile`
  - 测试：`npm run test`
  - 部署：`npm run deploy:local`、`npm run deploy:base`
  - 本地节点：`npm run node`

## 架构概览
- **backend-api**：基于 Gin 的 HTTP API，Auth0 认证，MySQL/Redis/RocketMQ，Telegram 机器人钩子。
- **backend-driver**：用于地址和交易的事件驱动监控器；可按链配置。
- **backend-action**：执行由驱动器触发的交易和通知工作流。
- **backend-admin-api**：启用 RBAC 的管理端点。
- **chainbase-* 服务**：外部区块链数据提供商的包装器（RPC、DEX、价格、名称服务、区块扫描器）。
- **前端**：`chainbot-vite`（用户 UI）、`frontend-admin`（管理仪表板）、`swapbot-miniapp`、`wallet-guard`。
- **共享库**：`base-gokit`（通用 Go 工具）、`go-ethereum`（修补的客户端）、`dev-mcp`（工具/监控）。

## 工作流与部署
- 从 `dev` 或基于 `dev` 的功能分支工作；永远不要直接提交到 `master`。
- 推送前进行本地验证：
  ```bash
  go build -o service .
  npm/pnpm build
  ```
- CI/CD：
  - 推送到 `dev` ⇒ 自动部署到 Kubernetes 命名空间 `chainbot-test`（服务使用 `-test` 后缀）。
  - 到达生产环境：合并到 `dev`，在测试环境验证，然后 PR `dev → master`。
- MCP 辅助工具（通过 devmcp 运行）：
  - 部署：`mcp__devmcp__ops_github_cli command="workflow run Deploy --repo ChainbotAI/[repo-name] --ref [dev|master] -f env_input=[test|prod]"`
  - 最近的工作流状态：`mcp__devmcp__ops_github_cli command="run list --repo ChainbotAI/[repo-name] --limit 1 --json status,conclusion,url"`
  - 日志（测试）：`mcp__devmcp__log_grafana_query source="loki" query='{app="[repo-name]-test"}' limit=100 startTime="now-1h"`
  - 过滤日志：同样的查询加上 `|= "error"`

## 运维注意事项
- 每次部署预计约 3 分钟；通过 Grafana Loki 查询监控。
- 服务运行在 Kubernetes 上——除非明确指示，否则仅进行只读诊断（`kubectl get`、`logs`）。
- 更新共享库（例如 `base-gokit`）时，标记发布版本，然后在依赖的 `go.mod` 中更新版本。

## 完成前的心理检查清单
- ✅ 对受影响的组件应用了正确的构建/测试命令。
- ✅ 考虑了 `conf/` 目录（Go）或环境文件（前端）中的配置。
- ✅ 计划在生产环境之前先在 `chainbot-test` 中进行测试部署。
- ✅ 如需要手动 MCP 或 kubectl 后续操作，已留下备注。
