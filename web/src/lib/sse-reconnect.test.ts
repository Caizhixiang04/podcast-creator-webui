import { describe, expect, it } from "vitest";
import { nextReconnectDelayMs } from "./sse-reconnect";

describe("nextReconnectDelayMs", () => {
  it(" grows exponentially and caps", () => {
    expect(nextReconnectDelayMs(0)).toBe(500);
    expect(nextReconnectDelayMs(1)).toBe(1000);
    expect(nextReconnectDelayMs(2)).toBe(2000);
    expect(nextReconnectDelayMs(10)).toBe(30_000);
    expect(nextReconnectDelayMs(99)).toBe(30_000);
  });
});
