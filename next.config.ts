import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure compatibility with Netlify
  images: {
    unoptimized: true,
  },
  // Configure external packages
  serverExternalPackages: [],
  // Remove standalone output for Netlify compatibility
  // output: 'standalone', // This conflicts with Netlify edge functions
  experimental: {
    esmExternals: true,
  },
  // Suppress hydration warnings for development
  reactStrictMode: true,
  // Add error handling for production
  onDemandEntries: {
    // Make sure pages are kept in cache for at least this long
    maxInactiveAge: 25 * 1000,
    // Number of pages to keep simultaneously in memory
    pagesBufferLength: 2,
  },
};

export default nextConfig;
