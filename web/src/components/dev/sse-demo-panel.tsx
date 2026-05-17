"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { nextReconnectDelayMs } from "@/lib/sse-reconnect";
import { Button } from "@/components/ui/button";

type Line = { t: number; text: string };

export function SseDemoPanel() {
  const [running, setRunning] = useState(true);
  const [lines, setLines] = useState<Line[]>([]);
  const [status, setStatus] = useState<"live" | "idle" | "reconnecting">("idle");
  const attemptRef = useRef(0);
  const esRef = useRef<EventSource | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const runningRef = useRef(running);

  useEffect(() => {
    runningRef.current = running;
  }, [running]);

  const push = useCallback((text: string) => {
    setLines((prev) => [{ t: Date.now(), text }, ...prev].slice(0, 40));
  }, []);

  const disconnect = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    esRef.current?.close();
    esRef.current = null;
    setStatus("idle");
  }, []);

  const connect = useCallback(() => {
    disconnect();
    const es = new EventSource("/api/sse-demo");
    esRef.current = es;

    es.addEventListener("open", () => {
      attemptRef.current = 0;
      setStatus("live");
      push("连接已建立 (open)");
    });

    es.addEventListener("ready", (ev) => {
      push(`ready: ${(ev as MessageEvent).data}`);
    });

    es.addEventListener("heartbeat", (ev) => {
      push(`heartbeat: ${(ev as MessageEvent).data}`);
    });

    es.onerror = () => {
      push("连接错误，准备重连…");
      setStatus("reconnecting");
      es.close();
      const delay = nextReconnectDelayMs(attemptRef.current);
      attemptRef.current += 1;
      if (!runningRef.current) {
        setStatus("idle");
        return;
      }
      timerRef.current = setTimeout(() => {
        if (runningRef.current) {
          connect();
        }
      }, delay);
    };
  }, [disconnect, push]);

  useEffect(() => {
    if (!running) {
      disconnect();
      return;
    }
    connect();
    return () => {
      disconnect();
    };
  }, [running, connect, disconnect]);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">SSE 演示</h1>
        <p className="text-sm text-muted-foreground">
          服务端每 5s 发送 heartbeat；客户端在错误时按指数退避自动重连。
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm">
          状态：
          <span className="font-medium">
            {status === "live" && "● Live"}
            {status === "reconnecting" && "◌ Reconnecting"}
            {status === "idle" && "○ Idle"}
          </span>
        </span>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => setRunning((r) => !r)}
        >
          {running ? "暂停连接" : "恢复连接"}
        </Button>
      </div>
      <div className="rounded-md border border-border bg-muted/30 p-3 font-mono text-xs leading-relaxed">
        {lines.length === 0 ? (
          <p className="text-muted-foreground">等待事件…</p>
        ) : (
          <ul className="space-y-1">
            {lines.map((l) => (
              <li key={`${l.t}-${l.text}`}>
                <span className="text-muted-foreground">
                  {new Date(l.t).toLocaleTimeString()}
                </span>{" "}
                {l.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
