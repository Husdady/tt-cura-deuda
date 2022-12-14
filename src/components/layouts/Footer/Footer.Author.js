// Services
import { AUTHOR, AUTHOR_PORTFOLIO_URL } from '@root/src/utils/credentials'

export default function Author() {
  return (
    <a id="author" target="_blank" href={AUTHOR_PORTFOLIO_URL} rel="noreferrer">
      {AUTHOR}
    </a>
  )
}
