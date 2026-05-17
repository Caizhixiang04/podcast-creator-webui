# podcast-creator-webui

AI-Native 内容平台的 **Next.js 产品 WEBUI（M0 骨架）**。

- **应用代码**：[`web/`](./web/) — `npm install && npm run dev`  
- **项目说明**：[`docs/PROJECT_BRIEFING.md`](./docs/PROJECT_BRIEFING.md)  
- **OpenSpec 变更**：[`openspec/changes/m0-webui-dashboard-sse-cicd`](./openspec/changes/m0-webui-dashboard-sse-cicd/)

## CI

Lint → Type Check (`tsc`) → Test → Build；`main` 推送后可部署至 Vercel（需配置 GitHub Secrets，见工单或 `PROJECT_BRIEFING.md`）。
