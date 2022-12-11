import transpileModules from 'next-transpile-modules'
import bundleAnalyzer from '@next/bundle-analyzer'

const withTM = transpileModules(['ui', 'schema']);
const withBundleAnalyzer = bundleAnalyzer({
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
