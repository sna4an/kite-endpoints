import { NextRequest, NextResponse } from "next/server";

const RAPIDAPI_KEYS = [
  process.env.RAPIDAPI_KEY_1 || "",
  process.env.RAPIDAPI_KEY_2 || "",
  process.env.RAPIDAPI_KEY_3 || "",
].filter(Boolean);

function getKey(slug: string): string {
  if (RAPIDAPI_KEYS.length === 0) return "";
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) - hash + slug.charCodeAt(i)) | 0;
  }
  return RAPIDAPI_KEYS[Math.abs(hash) % RAPIDAPI_KEYS.length];
}

export async function proxyToRapidAPI(
  req: NextRequest,
  host: string,
  upstreamPath: string,
  method: string = "POST"
): Promise<NextResponse> {
  const slug = req.nextUrl.pathname.replace("/api/", "");
  const key = getKey(slug);
  
  if (!key) {
    return NextResponse.json({ error: "No RapidAPI key configured" }, { status: 500 });
  }

  const url = `https://${host}${upstreamPath}`;
  const headers: Record<string, string> = {
    "X-RapidAPI-Key": key,
    "X-RapidAPI-Host": host,
    "Content-Type": "application/json",
  };

  try {
    let body: string | undefined;
    if (method === "POST" || method === "PUT" || method === "PATCH") {
      try {
        const json = await req.json();
        body = JSON.stringify(json);
      } catch {
        body = await req.text();
      }
    }

    const upstream = await fetch(url, {
      method,
      headers,
      body,
      signal: AbortSignal.timeout(25000),
    });

    const data = await upstream.text();
    const res = new NextResponse(data, { status: upstream.status });
    res.headers.set("Content-Type", upstream.headers.get("Content-Type") || "application/json");
    res.headers.set("Cache-Control", "public, s-maxage=5, stale-while-revalidate=10");
    return res;
  } catch (err: any) {
    return NextResponse.json(
      { error: "Upstream error", message: err.message },
      { status: 502 }
    );
  }
}
