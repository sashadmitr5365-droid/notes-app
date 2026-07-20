import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Optimizations for production
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
