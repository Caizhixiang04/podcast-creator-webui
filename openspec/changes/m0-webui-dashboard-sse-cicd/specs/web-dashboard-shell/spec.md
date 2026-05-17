## ADDED Requirements

### Requirement: Dashboard 提供统一布局与主导航

系统 SHALL 在 Next.js App Router 下为产品页面提供包含顶栏、面包屑与侧边栏的 Dashboard 布局；桌面端显示固定侧边栏，移动端 SHALL 通过可访问的控制（例如菜单按钮）打开/关闭同一套导航（例如抽屉/Sheet）。

#### Scenario: 桌面端展示完整侧边栏

- **WHEN** 视口宽度处于桌面断点（Tailwind `md` 及以上）
- **THEN** 用户在不打开抽屉的情况下即可看到包含 Workspace 导航项的侧边栏

#### Scenario: 移动端可收起侧边导航

- **WHEN** 视口宽度小于 `md`
- **THEN** 用户可通过显式控件展开导航面板并在选择链接后关闭面板（受控 `Sheet` 行为）

### Requirement: 主导航范围遵循 M0 冻结

导航 SHALL 暴露 **Projects**、**Templates**、**Assets** 三个工作区入口，并可包含仅限演示/实验室用途的附加链接（例如 **SSE 演示**）。M0 SHALL NOT 在主导航中交付 Analytics、编辑器、预览系统或 Quality Panel。

#### Scenario: Workspace 链接可到达壳页面

- **WHEN** 用户访问 `/projects`、`/templates`、`/assets`
- **THEN** 页面在 Dashboard 布局内渲染且不会因缺失业务数据而崩溃（允许空状态）
