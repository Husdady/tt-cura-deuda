// Containers
import MainContainer from '@containers/MainContainer'

// Heads
import { HomePageHead } from '@heads'
import SelectCivilizationContainer from '@root/src/containers/SelectCivilization'

export default function HomePage() {
  return (
    <MainContainer head={<HomePageHead />}>
      <SelectCivilizationContainer />
    </MainContainer>
  )
}
