/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicitly disable Turbopack features
  experimental: {
    turbo: {
      // empty object means: don’t try to alias/bundle Node-only packages
      resolveAlias: {},
    },
  },
};

export default nextConfig;
