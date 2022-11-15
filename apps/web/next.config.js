const withTM = require('next-transpile-modules')(['ui']);

module.exports = withTM({
  reactStrictMode: false,
  images: {
    domains: ['i.pinimg.com', 'ca.slack-edge.com'],
    unoptimized: true
  },
  publicRuntimeConfig: {
    apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:7071/api'
  }
});
