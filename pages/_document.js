// Librarys
import { Html, Head, Main, NextScript } from 'next/document'

// Headers
import { FaviconHead } from '@heads'

// Package
const pk = require('@root/package.json')

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="author" content={pk.author} />
        <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Silkscreen&display=swap"
          rel="stylesheet"
        ></link>
        <FaviconHead />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
