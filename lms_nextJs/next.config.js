/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/browse', // Replace with the actual path of your default page
      },
    ];
  },
  images: {
    unoptimized: true,
    domains: ['media.graphassets.com'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Fallback for modules that require 'fs' in client-side code
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
