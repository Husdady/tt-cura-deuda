// Components
import Error from '@common/Error'

// Containers
import MainContainer from '@containers/MainContainer'

// Heads
import { ErrorPageHead } from '@heads'

export default function ErrorPage() {
  return (
    <MainContainer head={<ErrorPageHead />}>
      <Error
        title="Sorry, this page does not exists"
        image={{
          alt: 'page-not-found',
          width: '300px',
          height: '300px',
          title: 'Page not found',
          url: 'https://media3.giphy.com/media/j5b2lBETOjjYHGik2k/giphy.gif?cid=790b7611929836140736844e5729bf4692ba61a2c18524bb&rid=giphy.gif&ct=g'
        }}
      />
    </MainContainer>
  )
}
