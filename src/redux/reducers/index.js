// Librarys
import { combineReducers } from 'redux'

// Reducers
import username from './username'
import civilizations from './civilizations'
import my_civilization from './my_civilization'

// Definir reducers
const reducers = combineReducers({
  username: username,
  civilizations: civilizations,
  my_civilization: my_civilization
})

export default reducers
