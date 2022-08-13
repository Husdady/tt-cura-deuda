// Librarys
import Head from 'next/head'

// API
import { APP_NAME } from '@services/credentials'

export default function SearchPageHead() {
  return (
    <Head>
      <meta property="og:title" content={APP_NAME} />
      <meta
        name="keywords"
        content="age-of-empires, age-of-empires-api, Age of Empires, Age of Empires API"
      />
      <meta
        name="description"
        content="Search for a favorite Age of Empires II Civilization"
      />
      <title>Search a Civilization | {APP_NAME}</title>
    </Head>
  )
}
