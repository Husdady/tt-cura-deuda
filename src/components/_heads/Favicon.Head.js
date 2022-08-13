// React
import { Fragment } from 'react'

// Services
import { APP_NAME } from '@services/credentials'

// Apple favicons
const faviconAppleIcon57x57 = require('@public/apple-icon-57x57.png')
const faviconAppleIcon60x60 = require('@public/apple-icon-60x60.png')
const faviconAppleIcon72x72 = require('@public/apple-icon-72x72.png')
const faviconAppleIcon76x76 = require('@public/apple-icon-76x76.png')
const faviconAppleIcon114x114 = require('@public/apple-icon-114x114.png')
const faviconAppleIcon120x120 = require('@public/apple-icon-120x120.png')
const faviconAppleIcon144x144 = require('@public/apple-icon-144x144.png')
const faviconAppleIcon152x152 = require('@public/apple-icon-152x152.png')
const faviconAppleIcon180x180 = require('@public/apple-icon-180x180.png')

// Android favicons
const faviconAndroidIcon36x36 = require('@public/android-icon-36x36.png')
const faviconAndroidIcon48x48 = require('@public/android-icon-48x48.png')
const faviconAndroidIcon72x72 = require('@public/android-icon-72x72.png')
const faviconAndroidIcon96x96 = require('@public/android-icon-96x96.png')
const faviconAndroidIcon144x144 = require('@public/android-icon-144x144.png')
const faviconAndroidIcon192x192 = require('@public/android-icon-192x192.png')

// Default favicons
const defaultFavicon = require('@public/favicon.ico').default.src
const defaultFavicon16x16 = require('@public/favicon-16x16.png')
const defaultFavicon32x32 = require('@public/favicon-32x32.png')
const defaultFavicon96x96 = require('@public/favicon-96x96.png')

// MS favicons
const msFavicon70x70 = require('@public/ms-icon-70x70.png')
const msFavicon144x144 = require('@public/ms-icon-144x144.png')
const msFavicon150x150 = require('@public/ms-icon-150x150.png')
const msFavicon310x310 = require('@public/ms-icon-310x310.png')

const appleFavicons = [
  { sizes: '57x57', href: faviconAppleIcon57x57.default.src },
  { sizes: '60x60', href: faviconAppleIcon60x60.default.src },
  { sizes: '72x72', href: faviconAppleIcon72x72.default.src },
  { sizes: '76x76', href: faviconAppleIcon76x76.default.src },
  { sizes: '114x114', href: faviconAppleIcon114x114.default.src },
  { sizes: '120x120', href: faviconAppleIcon120x120.default.src },
  { sizes: '144x144', href: faviconAppleIcon144x144.default.src },
  { sizes: '152x152', href: faviconAppleIcon152x152.default.src },
  { sizes: '180x180', href: faviconAppleIcon180x180.default.src }
]

const androidFavicons = [
  { sizes: '36x36', href: faviconAndroidIcon36x36.default.src },
  { sizes: '48x48', href: faviconAndroidIcon48x48.default.src },
  { sizes: '72x72', href: faviconAndroidIcon72x72.default.src },
  { sizes: '96x96', href: faviconAndroidIcon96x96.default.src },
  { sizes: '144x144', href: faviconAndroidIcon144x144.default.src },
  { sizes: '192x192', href: faviconAndroidIcon192x192.default.src }
]

const defaultFavicons = [
  { sizes: '16x16', href: defaultFavicon16x16.default.src },
  { sizes: '32x32', href: defaultFavicon32x32.default.src },
  { sizes: '96x96', href: defaultFavicon96x96.default.src }
]

const msFavicons = [
  msFavicon70x70.default.src,
  msFavicon144x144.default.src,
  msFavicon150x150.default.src,
  msFavicon310x310.default.src
]

export default function FaviconHeader() {
  return (
    <Fragment>
      <meta name="theme-color" content="#000000"></meta>
      <meta name="msapplication-TileColor" content="#000000"></meta>

      {msFavicons.map((favicon, i) => (
        <meta key={i} name="msapplication-TileImage" content={favicon}></meta>
      ))}

      {appleFavicons.map((favicon, i) => (
        <link
          key={i}
          sizes={favicon.sizes}
          rel="apple-touch-icon"
          href={favicon.href}
        ></link>
      ))}

      {androidFavicons.map((favicon, i) => (
        <link
          key={i}
          rel="icon"
          type="image/png"
          sizes={favicon.sizes}
          href={favicon.href}
        ></link>
      ))}

      {defaultFavicons.map((favicon, i) => (
        <link
          key={i}
          rel="icon"
          type="image/png"
          sizes={favicon.sizes}
          href={favicon.href}
        ></link>
      ))}

      <link rel="manifest" href="./manifest.json"></link>
      <link rel="shortcut icon" href={defaultFavicon} />
      <title>{APP_NAME}</title>
    </Fragment>
  )
}
