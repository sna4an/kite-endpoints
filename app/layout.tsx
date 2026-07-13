import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KiteEndpoints.ai - Mega API Hub",
  description: "400+ paid API endpoints. Social media, AI, crypto, finance, weather, ecommerce, tools. Pay per request with USDC on Base chain.",
  keywords: ["api", "paid api", "x402", "usdc", "crypto", "social media", "ai", "rapidapi"],
  authors: [{ name: "KiteEndpoints.ai" }],
  openGraph: {
    title: "KiteEndpoints.ai - Mega API Hub",
    description: "400+ paid API endpoints. Pay per request with USDC.",
    url: "https://kite-endpoints.vercel.app",
    siteName: "KiteEndpoints.ai",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, -apple-system, sans-serif", background: "#0a0a0a", color: "#e5e5e5" }}>
        {children}
      </body>
    </html>
  );
}
