/* eslint-disable @typescript-eslint/no-var-requires */
// const withTM = require('next-transpile-modules')(['ui', 'schema']);
let withBundleAnalyzer

if (process.env.ANALYZE === 'true') {
  withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
  })
} else {
  withBundleAnalyzer = (obj) => obj
}


/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  reactStrictMode: false,
  images: {
    domains: ['i.pinimg.com', 'ca.slack-edge.com'],
    unoptimized: true,
  },
  publicRuntimeConfig: {
    apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:7071/api',
  },
  async redirects() {
    return [
      {
        source: '/play',
        destination: '/game/lobby',
        permanent: true
      }
    ]
  },
  experimental: {
    transpilePackages: ["ui"],
    appDir: true,
  },
});
