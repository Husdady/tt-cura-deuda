// Containers
import MainContainer from '@containers/MainContainer'

// Heads
import { SearchPageHead } from '@heads'

export default function MyCivilizationPage() {
  return (
    <MainContainer head={<SearchPageHead />}>
      <h3 className="title">Search a Civilization</h3>
    </MainContainer>
  )
}
