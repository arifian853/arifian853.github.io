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
    optimizePackageImports: ['react-icons/si', 'react-icons/fa', 'react-icons/fa6'],
    optimizeCss: process.env.NODE_ENV === 'production', // Minify CSS in production
    viewTransition: true,
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
    qualities: [75, 80, 95],
    // For static export, we need to use unoptimized images
    ...(isStaticExport && {
      unoptimized: true,
    }),
  },
};

export default nextConfig;
