/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  swcMinify: true,
  images: {
    domains: ["images.unsplash.com"],
  },
}

module.exports = nextConfig
