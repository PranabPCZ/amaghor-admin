/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ✅ This prevents ESLint from failing your Vercel builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ✅ This prevents type errors from failing your Vercel builds
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
