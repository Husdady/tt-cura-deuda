// Librarys
import Head from 'next/head'

// API
import { APP_NAME } from '@root/src/utils/credentials'

// Librarys
import PropTypes from 'prop-types'

export default function CivilizationHead({ name }) {
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
      <title>
        {name} Civilization | {APP_NAME}
      </title>
    </Head>
  )
}

CivilizationHead.propTypes = {
  name: PropTypes.string.isRequired
}
