import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["elyorbekanvarov.pythonanywhere.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
