import { NextResponse, type NextRequest } from "next/server";

import { getViews } from "@/lib/api/tracking";
import { parseQueryParams, ViewsQuerySchema } from "@/lib/api/validation";

export const dynamic = "force-dynamic";

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
      ViewsQuerySchema
    );
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error },
        { status: 400, headers: corsHeaders }
      );
    }
    const { site, path } = parsed.data;

    const views = await getViews(site, path);

    return NextResponse.json({ views }, { headers: corsHeaders });
  } catch (err: unknown) {
    console.error("Unhandled error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
