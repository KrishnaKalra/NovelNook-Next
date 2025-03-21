import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Remove this line
  },
  /* config options here */
  reactStrictMode: false,
};

export default nextConfig;
