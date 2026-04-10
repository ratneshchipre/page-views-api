import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

import { rateLimit, RateLimitError } from "@/lib/api/rate-limit";
import { trackView } from "@/lib/api/tracking";
import { getClientIp, getVisitorId } from "@/lib/api/utils";
import { TrackQuerySchema, parseQueryParams } from "@/lib/api/validation";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const parsed = parseQueryParams(
      request.nextUrl.searchParams,
      TrackQuerySchema
    );
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error },
        { status: 400, headers: corsHeaders }
      );
    }
    const { site, path } = parsed.data;

    const ip = getClientIp(request);
    await rateLimit(ip, site, path);

    const visitorId = getVisitorId(request);

    await trackView(site, path, visitorId);

    return NextResponse.json({ success: true }, { headers: corsHeaders });
  } catch (err: unknown) {
    if (err instanceof RateLimitError) {
      return NextResponse.json(
        { error: err.message },
        { status: 429, headers: corsHeaders }
      );
    }

    console.error("Unhandled error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
