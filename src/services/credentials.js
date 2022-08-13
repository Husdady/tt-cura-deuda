// Variables de entorno
const API_URL = process.env.API_URL
const PUBLIC_URL = process.env.PUBLIC_URL
const APP_NAME = process.env.APP_NAME
const AUTHOR = process.env.AUTHOR
const AUTHOR_PORTFOLIO_URL = process.env.AUTHOR_PORTFOLIO_URL

const env = {
  API_URL: API_URL,
  PUBLIC_URL: PUBLIC_URL,
  APP_NAME: APP_NAME,
  AUTHOR: AUTHOR,
  AUTHOR_PORTFOLIO_URL: AUTHOR_PORTFOLIO_URL
}

module.exports = {
  env: env,
  ...env
}
