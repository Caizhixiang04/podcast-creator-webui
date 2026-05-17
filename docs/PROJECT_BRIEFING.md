# 项目统一入口（Project Briefing）

## 仓库结构

| 路径 | 说明 |
| --- | --- |
| `web/` | **产品 Web**：Next.js 14（App Router）+ TypeScript + Tailwind + shadcn/ui |
| `debug/streamlit_app.py` | **调试面板占位**：Streamlit 仅用于内部调试，不作为产品主路径 |
| `openspec/` | OpenSpec：变更提案与规格（本里程碑变更 `m0-webui-dashboard-sse-cicd`） |
| `.github/workflows/ci.yml` | CI：Lint → Typecheck → Test → Build；配置了变量后 `main` 才跑 Vercel Deploy |

## 本地开发

```bash
cd web
npm install
npm run dev
```

- 产品首页重定向至 `/projects`（Dashboard）。
- SSE 演示：`/dev/sse`，API：`GET /api/sse-demo`。

## 质量命令

```bash
cd web
npm run lint
npm run test:run
npm run build
```

## CI/CD 与 Staging

1. 在 Vercel 创建项目，根目录指向 `web`（或在 Vercel 项目设置中配置）。
2. 同上路径，先配置 **Secrets**：

   - `VERCEL_TOKEN` — Vercel Account → Tokens
   - `VERCEL_ORG_ID` — 一般在项目 `.vercel/project.json` 或 Vercel 团队设置可见
   - `VERCEL_PROJECT_ID` — 同上

3. **Repository variables**：**Settings → Secrets and variables → Actions → Variables** 新增 **`VERCEL_CI_DEPLOY`** = **`true`**。未设置或为 `false` 时，`deploy-vercel` 任务会被跳过——避免在 secrets 未就绪时把整个 CI 标红。

4. 设置完成后，`main` 推送会附带 `deploy-vercel`：`npx vercel@33 deploy`。

## 相关文档

- [`WEBUI-Tech-Selection-and-Prototype.md`](./WEBUI-Tech-Selection-and-Prototype.md) — 选型与原型说明（M0）
