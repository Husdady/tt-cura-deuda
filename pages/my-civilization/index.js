// Containers
import MainContainer from '@containers/MainContainer'
import MyCivilization from '@containers/MyCivilization'

// Heads
import { HomePageHead } from '@heads'

export default function MyCivilizationPage() {
  return (
    <MainContainer head={<HomePageHead />}>
      <MyCivilization />
    </MainContainer>
  )
}
