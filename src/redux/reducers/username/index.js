import { CHANGE_USERNAME } from '@redux/statics'

const initialState = ''

const username = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_USERNAME:
      return action.payload

    default:
      return state
  }
}

export default username
