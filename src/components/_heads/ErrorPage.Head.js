// Librarys
import Head from 'next/head'

// API
import { APP_NAME } from '@utils/credentials'

export default function ErrorPageHead() {
  return (
    <Head>
      <meta property="og:title" content={APP_NAME} />
      <meta
        name="keywords"
        content="age-of-empires, age-of-empires-api, Age of Empires, Age of Empires API"
      />
      <meta name="description" content="Error application page not found" />
      <title>Page not found</title>
    </Head>
  )
}
