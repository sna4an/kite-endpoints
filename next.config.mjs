const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [{
      source: "/api/:path*",
      headers: [
        { key: "Access-Control-Allow-Origin", value: "*" },
        { key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS" },
        { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization, X-RapidAPI-Key, X-RapidAPI-Host" },
      ],
    }];
  },
};
export default nextConfig;
