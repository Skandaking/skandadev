import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',   // This enables static site generation
  images: {
    unoptimized: true // Required for static exports
  }
};

export default nextConfig;
