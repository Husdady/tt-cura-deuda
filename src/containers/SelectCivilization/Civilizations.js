// React
import { Fragment } from 'react'

// Components
import Loading from '@common/Loading'

// Librarys
import dynamic from 'next/dynamic'
import { useSelector, useDispatch } from 'react-redux'

// Hooks
import useFetch from '@hooks/useFetch'

// Services
import { APP_NAME, PUBLIC_URL } from '@root/src/utils/credentials'

// Redux
import actions from '@redux/actions'

// Utils
import { isEmptyArray, isEmptyObject } from '@utils/Validations'

const Civilization = dynamic(() => import('./Civilization'), {
  suspense: true
})

export default function Civilizations() {
  const dispatch = useDispatch() // Obtener dispatch
  const cvlz = useSelector((store) => store.civilizations) // Obtener civilizaciones

  const { errors, isLoading } = useFetch(`${PUBLIC_URL}/api/civilizations`, {
    stopFetch: !isEmptyArray(cvlz), // Dejar de solicitar a la API cuando ya existen civilizaciones
    callback: ({ data }) => {
      const { saveCivilizations } = actions(dispatch)

      const civilizations = data.civilizations.filter(
        (civilization, index, self) =>
          index === self.findIndex((el) => el.name === civilization.name)
      )

      saveCivilizations(civilizations) // Guardar las civilizaciones
    }
  })

  // Está solicitando los datos de la API
  if (isLoading) {
    return <Loading />
  }

  // Errores no son un objeto vacío
  const existErrors = !isEmptyObject(errors)

  // Verificar si existen errores
  if (existErrors) {
    return <h1 className="title">{errors.message}</h1>
  }

  return (
    <Fragment>
      <h1 className="title">{APP_NAME} Civilizations availables:</h1>

      <section className="civilizations">
        {cvlz.map((civilization) => (
          <Civilization key={civilization.id} {...civilization} />
        ))}
      </section>
    </Fragment>
  )
}
