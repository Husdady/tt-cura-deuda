// Librarys
import thunk from 'redux-thunk'
import { createWrapper } from 'next-redux-wrapper'
import { createStore, applyMiddleware } from 'redux'

// Config
import reducers from './reducers'
import storage from './async-storage'

// Services
import { NODE_ENV } from '@root/src/utils/credentials'

const isProductionMode = NODE_ENV === 'production'

const bindMiddleware = (middleware) => {
  // En modo de desarrollo, se usa la extensión '@redux-devtools/extension'
  if (!isProductionMode) {
    const { composeWithDevTools } = require('@redux-devtools/extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }

  return applyMiddleware(...middleware) // Usar middlewares
}

const makeStore = ({ isServer }) => {
  // Si está en el lado del servidor, crea una "store"
  if (isServer) {
    return createStore(reducers, bindMiddleware([thunk]))
  }

  // Si está en el lado del cliente, crea una "store" que persistirá
  const { persistStore, persistReducer } = require('redux-persist')

  // Configuración de redux persist
  const rootPersistConfig = {
    key: 'root',
    version: 1,
    storage: storage
  }

  // Crear localstorage
  const persistedReducer = persistReducer(rootPersistConfig, reducers)

  // Crear "store" global
  const store = createStore(persistedReducer, bindMiddleware([thunk]))

  // Definir el estado persistente en nuestra "store"
  store.__persistor = persistStore(store)

  return store
}

export const wrapper = createWrapper(makeStore)
