# WEBUI 技术选型与原型（M0）

## 选型摘要

| 领域 | 选择 | 说明 |
| --- | --- | --- |
| 框架 | **Next.js 14 App Router** | 与 M0 要求一致；RSC + 客户端组件分区 |
| 语言 / 样式 | **TypeScript + Tailwind CSS** | 设计令牌集中在 CSS 变量与 `tailwind.config.ts` |
| 组件 | **shadcn/ui（Base UI 风格生成物）** | 按需组件；本里程碑使用 Sheet、Button、ScrollArea、Breadcrumb 等 |
| 实时演示 | **SSE (`text/event-stream`)** | `GET /api/sse-demo` + 浏览器 `EventSource`；心跳 + 客户端指数退避重连 |
| 调试 UI | **Streamlit（独立进程）** | 仅 `debug/` 占位；**产品路径一律 Next.js** |

## 布局与导航（范围冻结）

- **Dashboard**：顶栏 + 面包屑 + 侧边栏；`md` 以下 sidebar 收入 **Sheet**，通过header 按钮展开/收起。
- **主导航**：Projects / Templates / Assets；实验室入口：**SSE 演示**（`/dev/sse`）。
- **明确不包含（M0）**：Analytics、编辑器、预览系统、Quality Panel。

## 原型页面

- `/projects`：项目列表**壳**（空状态）。
- `/templates`、`/assets`：占位文案。
- `/dev/sse`：SSE 连接日志与暂停/恢复控制。

## CI/CD

- **Lint** → `next lint`
- **Test** → `vitest run`（示例：`sse-reconnect` 纯函数）
- **Build** → `next build`
- **Deploy** → `vercel deploy`（需 GitHub Secrets，见 `PROJECT_BRIEFING.md`）
