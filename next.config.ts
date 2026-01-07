import type { NextConfig } from "next";

const isStaticExport = process.env.STATIC_EXPORT === 'true';

const nextConfig: NextConfig = {
  // Enable static export when STATIC_EXPORT env is true
  ...(isStaticExport && {
    output: 'export',
    trailingSlash: true,
  }),

  // Performance optimizations
  experimental: {
    optimizeCss: true, // Minify CSS in production
  },

  // Remove console.logs in production
  compiler: {
    ...(process.env.NODE_ENV === 'production' && {
      removeConsole: {
        exclude: ['error', 'warn'],
      },
    }),
  },

  images: {
    // Prefer modern image formats
    formats: ['image/avif', 'image/webp'],
    // Optimized device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200],
    qualities: [75, 80],
    // For static export, we need to use unoptimized images
    ...(isStaticExport && {
      unoptimized: true,
    }),
  },
};

export default nextConfig;
