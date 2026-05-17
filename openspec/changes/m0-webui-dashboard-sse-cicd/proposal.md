# M0 — Next.js WEBUI 骨架、Dashboard 与 CI/CD

## Why

需要统一的 Web 产品入口与可自动部署到 Staging 的 `main` 分支流水线，才能承接后续编辑器、预览与质量面板等功能；否则团队无法在一致布局与设计令牌上并行开发。

## What Changes

- 初始化 **Next.js 14（App Router）+ TypeScript + Tailwind CSS**，产品页面全部在 Next.js；**Streamlit 仅保留独立调试入口**（本变更提供最小占位）。
- 实现 **Dashboard 布局**：顶栏、面包屑、**响应式侧边栏**（移动端 Sheet 展开/收起）；导航项：**Projects / Templates / Assets**（M0 不含 Analytics、编辑器、预览、Quality Panel）。
- **项目列表壳**：`/projects` 空状态列表，可接 API。
- **SSE 演示**：`/api/sse-demo` Server-Sent Events（含周期性心跳）；客户端展示连接状态与 **断线重连**（EventSource 指数退避）。
- **CI/CD**：GitHub Actions — Lint → Test → Build → Deploy（Deploy 使用官方 `workflow_dispatch` / `VERCEL_TOKEN` 等可配置密钥，便于 5 分钟内完成流水线；Staging URL 由部署目标产出）。
- **测试**：Vitest + Testing Library（布局/钩子单测），遵循红-绿-重构。

## Capabilities

### New Capabilities

- `web-dashboard-shell`: Dashboard 布局、导航、面包屑、移动端侧边栏行为。
- `sse-connectivity-demo`: SSE 心跳与客户端重连策略（演示用端点与 UI）。

### Modified Capabilities

- （无）— `openspec/specs/` 当前无既有能力文档。

## Impact

- 新增 `web/` 依赖（Next、React、Tailwind、Radix/shadcn 风格组件）。
- 新增 `.github/workflows/ci.yml` 与可选部署 Job。
- 运维需配置 Staging 部署密钥（如 Vercel）。本地与 CI 均需 `npm run build` 通过。
