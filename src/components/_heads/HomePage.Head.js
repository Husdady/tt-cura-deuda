// Librarys
import Head from 'next/head'

// API
import { APP_NAME } from '@utils/credentials'

export default function HomePageHead() {
  return (
    <Head>
      <meta property="og:title" content={APP_NAME} />
      <meta
        name="keywords"
        content="age-of-empires, age-of-empires-api, Age of Empires, Age of Empires API"
      />
      <meta
        name="description"
        content="Application that displays information about the civilizations of the Age of Empires video game"
      />
      <title>Civilizations | {APP_NAME}</title>
    </Head>
  )
}
