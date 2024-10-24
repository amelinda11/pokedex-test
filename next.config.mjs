// @type {import('next').NextConfig }
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['raw.githubusercontent.com'],
  }
};

export default nextConfig;