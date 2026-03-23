import type { NextConfig } from "next";
<<<<<<< HEAD

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
=======
const nextConfig: NextConfig = {
>>>>>>> b23b969a5058c534f4f8421a4dd3108c16417f7b
};

export default nextConfig;
