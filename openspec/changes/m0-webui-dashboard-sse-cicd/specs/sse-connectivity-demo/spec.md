## ADDED Requirements

### Requirement: SSE 演示端点发送心跳

系统 SHALL 提供 `GET /api/sse-demo`，响应 `text/event-stream`，并在连接建立后周期性发送 `heartbeat` 事件（本实现为每 5 秒），并在连接开始处发送 `ready` 事件以便客户端确认订阅成功。

#### Scenario: 客户端收到 ready 与 heartbeat

- **WHEN** 浏览器或其他 HTTP 客户端打开 `GET /api/sse-demo` 并保持连接
- **THEN** 客户端依次能解析到 `ready` 与随后的 `heartbeat` 事件负载（JSON 包含时间戳字段）

### Requirement: 客户端在失败时按退避策略重连

浏览器端演示组件 SHALL 在 EventSource 进入错误状态时关闭旧连接，并依据单调递增的尝试计数计算等待时间后重新创建连接；退避算法的可测试纯函数 SHALL 具上界，避免无限放大等待时间。

#### Scenario: 重连延迟受上界限制

- **WHEN** 断线重连尝试次数足够大
- **THEN** 重新连接的等待时间 SHALL 不超过配置的上限（例如 30 秒）
