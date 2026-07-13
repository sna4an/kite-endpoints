import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    version: 1,
    resources: [
      "https://kite-endpoints.vercel.app/openapi.json"
    ]
  });
}
