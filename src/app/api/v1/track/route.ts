import { type NextRequest, NextResponse } from "next/server";
import { rateLimit, RateLimitError } from "@/lib/api/rate-limit";
import { trackView } from "@/lib/api/tracking";
import { getClientIp, getVisitorId } from "@/lib/api/utils";
import { TrackQuerySchema, parseQueryParams } from "@/lib/api/validation";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const parsed = parseQueryParams(
      request.nextUrl.searchParams,
      TrackQuerySchema
    );
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }
    const { site, path } = parsed.data;

    const ip = getClientIp(request);
    await rateLimit(ip);

    const visitorId = getVisitorId(request);

    await trackView(site, path, visitorId);

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    if (err instanceof RateLimitError) {
      return NextResponse.json({ error: err.message }, { status: 429 });
    }

    console.error("Unhandled error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
