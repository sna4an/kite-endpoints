export default function Home() {
  const categories = [
    { name: "Social Media", count: 129, icon: "📱", desc: "Twitter, Instagram, TikTok, YouTube, LinkedIn, Facebook, Telegram" },
    { name: "AI Models", count: 27, icon: "🤖", desc: "ChatGPT, Claude, Gemini, xAI, Image Generation, Content Detection" },
    { name: "Crypto", count: 46, icon: "₿", desc: "Prices, DeFi, DEX, Wallets, Polymarket, Hyperliquid, Solana" },
    { name: "Finance", count: 39, icon: "📈", desc: "Stocks, Forex, Trading Signals, Economic Calendar, Yahoo Finance" },
    { name: "Weather", count: 23, icon: "🌤️", desc: "Current, Forecast, Alerts, Air Quality, Sea Temperature" },
    { name: "Ecommerce", count: 16, icon: "🛒", desc: "Amazon, Shopee, AliExpress, Taobao, IKEA, Booking" },
    { name: "Tools", count: 48, icon: "🔧", desc: "Web Search, Screenshot, Translate, SEO, Scraping, QR Code" },
    { name: "News", count: 4, icon: "📰", desc: "Google News, Crypto News, Real-time Breaking News" },
    { name: "Free APIs", count: 9, icon: "🆓", desc: "DeFiLlama, DexScreener, CoinGecko, Fear & Greed Index" },
  ];

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
        padding: "80px 20px",
        textAlign: "center",
        borderBottom: "1px solid #222",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{
            width: 80, height: 80, margin: "0 auto 24px",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)",
            borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 40,
          }}>
            🪁
          </div>
          <h1 style={{
            fontSize: 48, fontWeight: 800, margin: "0 0 16px",
            background: "linear-gradient(135deg, #6366f1, #a855f7, #ec4899)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            KiteEndpoints.ai
          </h1>
          <p style={{ fontSize: 20, color: "#999", margin: "0 0 32px", lineHeight: 1.6 }}>
            Mega API Hub with <strong style={{ color: "#fff" }}>400+ paid endpoints</strong>.
            Social media, AI, crypto, finance, weather, ecommerce, and more.
            Pay per request with USDC on Base chain.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/openapi.json" style={{
              padding: "12px 32px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff", borderRadius: 8, textDecoration: "none", fontWeight: 600, fontSize: 16,
            }}>
              View OpenAPI Spec
            </a>
            <a href="#endpoints" style={{
              padding: "12px 32px", background: "transparent",
              color: "#a855f7", borderRadius: 8, textDecoration: "none", fontWeight: 600, fontSize: 16,
              border: "1px solid #a855f7",
            }}>
              Browse Endpoints
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{
        display: "flex", justifyContent: "center", gap: 48, padding: "40px 20px",
        borderBottom: "1px solid #1a1a1a", flexWrap: "wrap",
      }}>
        {[
          { label: "Endpoints", value: "400+" },
          { label: "Categories", value: "12" },
          { label: "Chain", value: "Base" },
          { label: "Token", value: "USDC" },
        ].map((s) => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: "#a855f7" }}>{s.value}</div>
            <div style={{ fontSize: 14, color: "#666", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* Categories */}
      <section id="endpoints" style={{ maxWidth: 1000, margin: "0 auto", padding: "60px 20px" }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, textAlign: "center", marginBottom: 40 }}>
          API Categories
        </h2>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 20,
        }}>
          {categories.map((cat) => (
            <div key={cat.name} style={{
              background: "#111", border: "1px solid #222", borderRadius: 12,
              padding: 24, transition: "border-color 0.2s",
            }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{cat.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 8px", color: "#fff" }}>
                {cat.name}
              </h3>
              <p style={{ fontSize: 13, color: "#888", margin: "0 0 12px", lineHeight: 1.5 }}>
                {cat.desc}
              </p>
              <span style={{
                fontSize: 12, color: "#a855f7", background: "#1a1a2e",
                padding: "4px 10px", borderRadius: 12, fontWeight: 600,
              }}>
                {cat.count} endpoints
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{
        background: "#0d0d0d", padding: "60px 20px",
        borderTop: "1px solid #1a1a1a",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 40 }}>How It Works</h2>
          <div style={{ display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { step: "1", title: "Discover", desc: "Browse our OpenAPI spec to find the endpoint you need" },
              { step: "2", title: "Pay", desc: "Send USDC payment on Base chain via x402 protocol" },
              { step: "3", title: "Get Data", desc: "Receive instant API response with real-time data" },
            ].map((s) => (
              <div key={s.step} style={{ flex: "1 1 200px", maxWidth: 250 }}>
                <div style={{
                  width: 48, height: 48, margin: "0 auto 16px",
                  background: "linear-gradient(135deg, #6366f1, #a855f7)",
                  borderRadius: "50%", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 20, fontWeight: 700, color: "#fff",
                }}>
                  {s.step}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 8px", color: "#fff" }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 14, color: "#888", lineHeight: 1.5 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: "32px 20px", textAlign: "center",
        borderTop: "1px solid #1a1a1a", color: "#555", fontSize: 13,
      }}>
        <p>KiteEndpoints.ai — Powered by x402 Protocol on Base Chain</p>
        <p style={{ marginTop: 8 }}>
          <a href="/openapi.json" style={{ color: "#a855f7", textDecoration: "none" }}>OpenAPI Spec</a>
          {" · "}
          <a href="/.well-known/x402" style={{ color: "#a855f7", textDecoration: "none" }}>Discovery</a>
        </p>
      </footer>
    </div>
  );
}
