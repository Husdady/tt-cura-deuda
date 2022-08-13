// Librarys
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

// Crear store temporal
const createNoopStorage = () => {
  return {
    getItem: () => Promise.resolve(null),
    setItem: (_, value) => Promise.resolve(value),
    removeItem: () => Promise.resolve()
  }
}

// Comprobar si el objeto window existe (Compatibilidad entre navegadores)
const existWindow = typeof window !== 'undefined'

// Si existe, devolvemos un WebStorage, sino un store temporal
const storage = existWindow ? createWebStorage('local') : createNoopStorage()

export default storage
