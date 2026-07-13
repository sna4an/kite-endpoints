import { NextRequest, NextResponse } from "next/server";

const WALLET = process.env.EVM_ADDRESS || "";
const FACILITATOR = process.env.FACILITATOR_URL || "https://facilitator.payai.network";

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Only intercept /api/* requests
  if (!path.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Let OPTIONS through
  if (request.method === "OPTIONS") {
    return NextResponse.next();
  }

  // Check if payment header already present (paid request)
  const paymentHeader = request.headers.get("X-PAYMENT");
  if (paymentHeader) {
    // Verify payment with facilitator
    try {
      const verifyRes = await fetch(`${FACILITATOR}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentHeader }),
      });
      const verifyData = await verifyRes.json();
      if (verifyData.isValid) {
        // Payment valid - let request through and settle in background
        const settlePromise = fetch(`${FACILITATOR}/settle`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentHeader }),
        }).catch(() => {});
        // Don't await settle - fire and forget
        return NextResponse.next();
      }
    } catch {}
    // If verify fails, fall through to 402
  }

  // No valid payment - return 402 with payment requirements
  const slug = path.replace("/api/", "").replace(/\/$/, "");
  
  // Dynamic pricing based on endpoint (use a hash for consistent pricing)
  const price = getPrice(slug);
  
  const requirements = {
    x402Version: 2,
    error: "Payment required",
    resource: {
      url: `${request.nextUrl.origin}${path}`,
      description: `API endpoint: ${slug}`,
      mimeType: "application/json",
      method: request.method,
    },
    accepts: [{
      scheme: "exact",
      network: "eip155:8453",
      amount: String(price),
      asset: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      payTo: WALLET,
      maxTimeoutSeconds: 300,
      extra: { name: "USD Coin", version: "2" },
    }],
  };

  const encoded = Buffer.from(JSON.stringify(requirements)).toString("base64");
  const res = NextResponse.json({}, { status: 402 });
  res.headers.set("Payment-Required", encoded);
  return res;
}

// Simple hash-based pricing ($0.05-$0.20 range)
function getPrice(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) - hash + slug.charCodeAt(i)) | 0;
  }
  const cents = 5 + (Math.abs(hash) % 16); // 5-20 cents
  return cents * 10000; // USDC atomic units
}

export const config = { matcher: ["/api/:path*"] };
