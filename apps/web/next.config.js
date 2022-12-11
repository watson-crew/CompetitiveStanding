/* eslint-disable @typescript-eslint/no-var-requires */
const withTM = require('next-transpile-modules')(['ui', 'schema']);
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer(withTM({
  reactStrictMode: false,
  pageExtensions: ['tsx'],
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
}));
