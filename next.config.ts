import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async rewrites() {
    return [
      { source: '/performance', destination: '/performance.html' },
      { source: '/performance/', destination: '/performance.html' },
    ];
  },
};

export default nextConfig;
