import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "elyorbekanvarov.pythonanywhere.com",
        port: "",
        pathname: "/**",
      },
    ],
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true, // ESLint xatolarini build vaqtida ignore qilish
  },
};

export default nextConfig;