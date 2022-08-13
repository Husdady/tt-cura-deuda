// Librarys
import { combineReducers } from 'redux'

// Reducers
import civilization from './civilization'
import civilizations from './civilizations'

// Definir reducers
const reducers = combineReducers({
  civilization: civilization,
  civilizations: civilizations
})

export default reducers
