// Librarys
import Head from 'next/head'

// API
import { APP_NAME } from '@services/credentials'

export default function MyCivilizationHead() {
  return (
    <Head>
      <meta property="og:title" content={APP_NAME} />
      <meta
        name="keywords"
        content="age-of-empires-civilization, age-of-empires-civilization-api, Age of Empires-civilization, Age of Empires-civilization API"
      />
      <meta
        name="description"
        content="My favorite Age of Empires II Civilization"
      />
      <title>My Civilization | {APP_NAME}</title>
    </Head>
  )
}
