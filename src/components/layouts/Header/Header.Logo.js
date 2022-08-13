// Librarys
import Image from 'next/image'

// Services
import { APP_NAME } from '@root/src/utils/credentials'

const logo = require('@public/img/age-of-empires-logo.webp')

export default function HeaderLogo() {
  return (
    <figure className="app-logo">
      <Image
        loading="eager"
        placeholder="blur"
        objectFit="contain"
        layout="fill"
        alt="age-of-empires-logo"
        src={logo}
        blurDataURL={logo}
        title={APP_NAME}
      />
    </figure>
  )
}
