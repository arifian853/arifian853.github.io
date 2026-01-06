import type { NextConfig } from "next";

const isStaticExport = process.env.STATIC_EXPORT === 'true';

const nextConfig: NextConfig = {
  // Enable static export when STATIC_EXPORT env is true
  ...(isStaticExport && {
    output: 'export',
    trailingSlash: true,
  }),
  images: {
    qualities: [75, 80],
    // For static export, we need to use unoptimized images
    ...(isStaticExport && {
      unoptimized: true,
    }),
  },
};

export default nextConfig;
