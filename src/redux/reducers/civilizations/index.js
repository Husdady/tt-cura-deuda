// Statics
import { SAVE_CIVILIZATIONS } from '@redux/statics'

const initialState = []

const civilizations = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_CIVILIZATIONS:
      return action.payload

    default:
      return state
  }
}

export default civilizations
