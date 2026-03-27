import { type NextRequest, NextResponse } from "next/server";
import { getViews } from "@/lib/api/tracking";
import { ViewsQuerySchema, parseQueryParams } from "@/lib/api/validation";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const parsed = parseQueryParams(
      request.nextUrl.searchParams,
      ViewsQuerySchema
    );
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }
    const { site, path } = parsed.data;

    const views = await getViews(site, path);

    return NextResponse.json({ views });
  } catch (err: unknown) {
    console.error("Unhandled error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
