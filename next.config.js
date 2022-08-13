// Services
const { env } = require('./src/utils/credentials')

// Librarys
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()

const urls_redirects = require('./public/data/redirects.json')

// Redirecciones
async function redirects() {
  return urls_redirects
}

// Reescritura de páginas
async function rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: `${env.API_URL}/:path*`
    }
  ]
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: env,
  swcMinify: true,
  reactStrictMode: false,
  rewrites: rewrites,
  redirects: redirects,
  images: {
    domains: ['media3.giphy.com', 'media4.giphy.com']
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')]
  }
}

module.exports = nextConfig
