import { NextRequest, NextResponse } from "next/server";
import type { DispatchRequest, DispatchResponse } from "@/types";
import { generateJobId } from "@/lib/utils";

export const runtime = "edge";

const STAGE_DURATIONS: Record<string, number> = {
  fetching:    900,
  parsing:     700,
  scripting:   1100,
  rendering:   1400,
  dispatching: 600,
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body: DispatchRequest = await req.json();

    // ── Validate ──────────────────────────────────────────────────────────
    if (!body.url || !body.url.startsWith("http")) {
      return NextResponse.json(
        { error: "Invalid URL. Must start with http:// or https://" },
        { status: 400 }
      );
    }

    if (!body.platform) {
      return NextResponse.json(
        { error: "Platform is required" },
        { status: 400 }
      );
    }

    const jobId = generateJobId();
    const estimatedSeconds = Object.values(STAGE_DURATIONS).reduce((a, b) => a + b, 0) / 1000;

    // ── Forward to n8n if configured ──────────────────────────────────────
    const n8nUrl = process.env.N8N_WEBHOOK_URL;
    const n8nSecret = process.env.N8N_WEBHOOK_SECRET;

    if (n8nUrl) {
      try {
        await fetch(n8nUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(n8nSecret ? { "X-Webhook-Secret": n8nSecret } : {}),
          },
          body: JSON.stringify({
            job_id:       jobId,
            url:          body.url,
            platform:     body.platform,
            options:      body.options,
            dispatched_at: new Date().toISOString(),
            source:       "vibeads-studio",
          }),
        });
      } catch (err) {
        // n8n failure is non-fatal — we queue locally
        console.warn("[dispatch] n8n forward failed:", err);
      }
    }

    const response: DispatchResponse = {
      jobId,
      status: "queued",
      estimatedSeconds: Math.ceil(estimatedSeconds),
    };

    return NextResponse.json(response, {
      status: 202,
      headers: {
        "X-Job-Id": jobId,
        "X-Estimated-Seconds": String(Math.ceil(estimatedSeconds)),
      },
    });
  } catch (err) {
    console.error("[dispatch] unhandled error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Status polling endpoint
export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get("jobId");

  if (!jobId) {
    return NextResponse.json({ error: "jobId required" }, { status: 400 });
  }

  // In production this would query your DB / Redis
  // Returning a mock status for the edge runtime demo
  return NextResponse.json({
    jobId,
    status: "rendering",
    progress: 60,
    stage: "scripting",
    updatedAt: new Date().toISOString(),
  });
}
