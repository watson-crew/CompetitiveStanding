/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['i.pinimg.com', 'ca.slack-edge.com'],
  },
}

module.exports = nextConfig
