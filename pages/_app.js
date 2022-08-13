// React
import { useEffect, useState, useCallback, useMemo } from 'react'

// Librarys
import Router from 'next/router'
import NProgress from 'nprogress'
import { useStore } from 'react-redux'
import { wrapper } from '@redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

// Utils
import { isWindowAvailable } from '@utils/Validations'

// Styles
import 'src/styles/globals.scss'

library.add(far, fas, fab)

function AgeOfEmpires({ Component, pageProps }) {
  const [isLoading, setLoading] = useState(true)
  // const [presentation, setPresentation] = useLocalStorage(
  //   PRESENTATION_KEY,
  //   true
  // )
  const store = useStore((state) => state)
  const persitor = isWindowAvailable() ? store.__persistor : store

  // Mostrar loading cuando se cambia de ruta
  const handlesShowLoading = useCallback(() => {
    NProgress.start()
    setLoading(true)
  }, [])

  // Ocultar loading cuando se cargó la página
  const handlesHideLoading = useCallback(() => {
    NProgress.done()
    setLoading(false)
  }, [])

  // Evento que se dispara cuando se está cambiando de ruta
  Router.events.on('routeChangeStart', handlesShowLoading)

  // Evento que se dispara cuando se termina de cambiar de ruta
  Router.events.on('routeChangeComplete', handlesHideLoading)

  // Evento que se dispara cuando hay un error al cambiar de ruta
  Router.events.on('routeChangeError', () => NProgress.done())

  return (
    <PersistGate loading={null} persistor={persitor}>
      <Component {...pageProps} />
    </PersistGate>
  )
}

export default wrapper.withRedux(AgeOfEmpires)
