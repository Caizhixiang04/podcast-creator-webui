/**
 * SSE 断线重连：指数退避 + 上限（纯函数，便于单测）。
 */
export function nextReconnectDelayMs(attempt: number): number {
  const base = 500;
  const cap = 30_000;
  const exp = Math.min(attempt, 10);
  return Math.min(base * 2 ** exp, cap);
}
