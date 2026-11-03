import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920, 2560],
  },
  transpilePackages: ["three"],
  experimental: {
    optimizePackageImports: ["@react-three/drei", "three"],
  },
};

export default nextConfig;
