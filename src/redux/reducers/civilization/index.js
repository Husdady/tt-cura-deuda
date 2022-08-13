// Statics
import { SELECT_CIVILIZATION } from '@redux/statics'

const initialState = {}

const civilization = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_CIVILIZATION:
      return action.payload

    default:
      return state
  }
}

export default civilization
