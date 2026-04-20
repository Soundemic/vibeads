import { NextRequest, NextResponse } from "next/server";
import { validateN8nSecret } from "@/lib/n8n";

export const runtime = "edge";

interface N8nCallbackPayload {
  job_id:      string;
  status:      "complete" | "error";
  output_url?: string;
  error?:      string;
  duration_ms?: number;
  platform:    string;
}

/**
 * POST /api/n8n-callback
 *
 * n8n calls this endpoint when a render job completes (or fails).
 * Validates the shared secret, then updates job state.
 *
 * In production: write to Redis/DB and optionally emit a WebSocket event
 * to update the client UI in real time.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const secret = req.headers.get("x-webhook-secret");

  if (!validateN8nSecret(secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: N8nCallbackPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.job_id) {
    return NextResponse.json({ error: "job_id required" }, { status: 400 });
  }

  console.info("[n8n-callback]", {
    jobId:      body.job_id,
    status:     body.status,
    outputUrl:  body.output_url,
    durationMs: body.duration_ms,
  });

  // ── Production implementation ─────────────────────────────────────────────
  // await redis.hset(`job:${body.job_id}`, {
  //   status:    body.status,
  //   outputUrl: body.output_url ?? "",
  //   updatedAt: Date.now(),
  // });
  //
  // if (pusher) {
  //   await pusher.trigger(`job-${body.job_id}`, "status-update", {
  //     status:    body.status,
  //     outputUrl: body.output_url,
  //   });
  // }
  // ─────────────────────────────────────────────────────────────────────────

  return NextResponse.json(
    { ok: true, jobId: body.job_id, received: new Date().toISOString() },
    { status: 200 }
  );
}
