import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 80, 90],
    deviceSizes: [390, 640, 828, 1080, 1440, 1920, 2560],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  poweredByHeader: false,
};

export default nextConfig;
