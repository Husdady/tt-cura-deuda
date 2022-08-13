// Services
const { env } = require('./src/services/credentials')

// Librarys
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: env,
  swcMinify: true,
  reactStrictMode: false,
  images: {
    domains: ['static.wikia.nocookie.net']
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')]
  },
  rewrites: () => {
    return [
      {
        source: '/api/:path*',
        destination: `${env.API_URL}/:path*`
      }
    ]
  }
}

module.exports = nextConfig
