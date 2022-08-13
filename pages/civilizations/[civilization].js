// Containers
import MainContainer from '@containers/MainContainer'
import Civilization from '@root/src/containers/Civilization'

// Heads
import { CivilizationPageHead } from '@heads'
import { withRouter } from 'next/router'

function CivilizationPage({ router }) {
  const cvlzName = router.query.civilization
  const title = cvlzName.charAt(0).toUpperCase() + cvlzName.slice(1)

  return (
    <MainContainer head={<CivilizationPageHead name={title} />}>
      <Civilization />
    </MainContainer>
  )
}

export default withRouter(CivilizationPage)

export async function getServerSideProps(ctx) {
  const { civilization } = ctx.query

  return {
    props: {
      civilization: civilization
    }
  }
}
