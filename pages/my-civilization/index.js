// Containers
import MainContainer from '@containers/MainContainer'
import MyCivilization from '@containers/MyCivilization'

// Heads
import { MyCivilizationPageHead } from '@heads'

export default function MyCivilizationPage() {
  return (
    <MainContainer head={<MyCivilizationPageHead />}>
      <MyCivilization />
    </MainContainer>
  )
}
