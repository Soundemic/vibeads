import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

/**
 * GET /api/status/[jobId]
 *
 * In production this queries Redis / your DB for real-time job state.
 * This edge handler returns a structured mock for UI integration testing.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: { jobId: string } }
): Promise<NextResponse> {
  const { jobId } = params;

  if (!jobId || !jobId.startsWith("vb-")) {
    return NextResponse.json(
      { error: "Invalid job ID format" },
      { status: 400 }
    );
  }

  // Derive a deterministic "progress" from the job ID for demo purposes
  const ts       = parseInt(jobId.split("-")[1] ?? "0", 10);
  const ageMs    = Date.now() - ts;
  const progress = Math.min(100, Math.floor(ageMs / 50));

  const stage =
    progress < 18  ? "fetching"    :
    progress < 38  ? "parsing"     :
    progress < 62  ? "scripting"   :
    progress < 85  ? "rendering"   :
    progress < 100 ? "dispatching" :
                     "complete";

  const status =
    stage === "complete"    ? "dispatched" :
    stage === "dispatching" ? "dispatched" :
                              "rendering";

  return NextResponse.json({
    jobId,
    status,
    stage,
    progress,
    updatedAt: new Date().toISOString(),
    ...(stage === "complete"
      ? { outputUrl: `https://cdn.vibeads.io/outputs/${jobId}.mp4` }
      : {}),
  });
}
