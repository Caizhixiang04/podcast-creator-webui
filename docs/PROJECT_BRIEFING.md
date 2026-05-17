# 项目统一入口（Project Briefing）

## 仓库结构

| 路径 | 说明 |
| --- | --- |
| `web/` | **产品 Web**：Next.js 14（App Router）+ TypeScript + Tailwind + shadcn/ui |
| `debug/streamlit_app.py` | **调试面板占位**：Streamlit 仅用于内部调试，不作为产品主路径 |
| `openspec/` | OpenSpec：变更提案与规格（本里程碑变更 `m0-webui-dashboard-sse-cicd`） |
| `.github/workflows/ci.yml` | CI：Lint → Test → Build；`main` 推送后 Deploy（Vercel） |

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
2. 在 GitHub 仓库 **Settings → Secrets and variables → Actions** 配置：

   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

3. `main` 推送后，工作流 `deploy-vercel` 执行 `vercel deploy`。**若 secrets 未配置，部署步骤将失败**；这与「需要 Staging URL」的验收一致——需由运维/负责人在托管侧完成一次性接入。

## 相关文档

- [`WEBUI-Tech-Selection-and-Prototype.md`](./WEBUI-Tech-Selection-and-Prototype.md) — 选型与原型说明（M0）
