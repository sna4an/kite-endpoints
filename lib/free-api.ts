import { NextRequest, NextResponse } from "next/server";

export async function proxyToFreeAPI(
  req: NextRequest,
  baseUrl: string,
  upstreamPath: string,
  method: string = "GET"
): Promise<NextResponse> {
  const url = `${baseUrl}${upstreamPath}`;
  
  try {
    const upstream = await fetch(url, {
      method,
      headers: { "Accept": "application/json" },
      signal: AbortSignal.timeout(15000),
    });

    const data = await upstream.text();
    const res = new NextResponse(data, { status: upstream.status });
    res.headers.set("Content-Type", "application/json");
    res.headers.set("Cache-Control", "public, s-maxage=30, stale-while-revalidate=60");
    return res;
  } catch (err: any) {
    return NextResponse.json(
      { error: "Upstream error", message: err.message },
      { status: 502 }
    );
  }
}
