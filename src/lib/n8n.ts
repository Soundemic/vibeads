/**
 * n8n Webhook Client
 * Server-side only — never import in client components.
 */

import type { DispatchRequest, GenerationJob } from "@/types";

const N8N_WEBHOOK_URL    = process.env.N8N_WEBHOOK_URL ?? "";
const N8N_WEBHOOK_SECRET = process.env.N8N_WEBHOOK_SECRET ?? "";

interface N8nDispatchPayload {
  job_id:        string;
  url:           string;
  platform:      string;
  options:       DispatchRequest["options"];
  dispatched_at: string;
  source:        string;
}

interface N8nDispatchResult {
  ok:      boolean;
  status?: number;
  error?:  string;
}

/**
 * Forward a generation job to the n8n webhook pipeline.
 * Non-fatal — callers should handle failures gracefully.
 */
export async function forwardToN8n(job: GenerationJob): Promise<N8nDispatchResult> {
  if (!N8N_WEBHOOK_URL) {
    console.warn("[n8n] N8N_WEBHOOK_URL not set — skipping dispatch");
    return { ok: false, error: "N8N_WEBHOOK_URL not configured" };
  }

  const payload: N8nDispatchPayload = {
    job_id:        job.id,
    url:           job.sourceUrl,
    platform:      job.platform,
    options:       job.options,
    dispatched_at: new Date().toISOString(),
    source:        "vibeads-studio",
  };

  try {
    const res = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(N8N_WEBHOOK_SECRET
          ? { "X-Webhook-Secret": N8N_WEBHOOK_SECRET }
          : {}),
      },
      body: JSON.stringify(payload),
      // Edge-compatible timeout via AbortSignal
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(`[n8n] Webhook returned ${res.status}:`, text);
      return { ok: false, status: res.status, error: text };
    }

    return { ok: true, status: res.status };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[n8n] Dispatch failed:", message);
    return { ok: false, error: message };
  }
}

/**
 * Validate the webhook secret on incoming n8n callbacks.
 */
export function validateN8nSecret(incomingSecret: string | null): boolean {
  if (!N8N_WEBHOOK_SECRET) return true; // Not configured → open
  return incomingSecret === N8N_WEBHOOK_SECRET;
}
