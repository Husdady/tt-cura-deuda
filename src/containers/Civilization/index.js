// React
import { Fragment } from 'react'

// Components
import Details from './Details'
import Error from '@common/Error'
import Loading from '@common/Loading'

// Librarys
import Image from 'next/image'
import { withRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'

// Hooks
import useFetch from '@hooks/useFetch'

// Actions
import actions from '@redux/actions'

// Utils
import { PUBLIC_URL } from '@utils/credentials'
import {
  isString,
  isEmptyString,
  isArray,
  isEmptyArray,
  isEmptyObject
} from '@utils/Validations'

const civilizations = require('@public/data/civilizations')

function Civilization({ router }) {
  const dispatch = useDispatch() // Obtener dispatch
  const civilization = useSelector((store) => store.civilization) // Obtener actual civilizacion
  const cvlzName = router.query.civilization // Obtener la civilizacion por parametro

  const { errors, isLoading } = useFetch(
    `${PUBLIC_URL}/api/civilization/${cvlzName}`,
    {
      stopFetch: civilization.name === cvlzName, // Dejar de solicitar a la API cuando ya existe una civilizacion seleccionada
      callback: ({ data }) => {
        const { selectCivilization } = actions(dispatch)
        selectCivilization(data) // Seleccionar nueva civilizacion
      }
    }
  )

  if (isLoading) {
    return <Loading />
  }

  const emptyErrors = isEmptyObject(errors)

  if (!emptyErrors) {
    // return <h1>Are you sure that the {cvlzName} Civilization exists?</h1>
    return (
      <Error
        title={`Are you sure that the ${cvlzName} Civilization exists?`}
        image={{
          alt: cvlzName,
          width: '300px',
          height: '300px',
          title: 'Unkown civilization',
          url: 'https://media4.giphy.com/media/dUBQvWHBY94CmyN2TB/giphy.gif?cid=790b761167d463a158a9ddf221009a622451ffc904da12bc&rid=giphy.gif&ct=g'
        }}
      />
    )
  }

  const { history } = civilizations.find(
    (item) => item.civilizationId === civilization.id
  )

  const cvzName = civilization.name.toLowerCase() // Nombre de la civilización a minusculas
  const emblem = require('@public/img/civilizations/' + cvzName + '.webp') // Obtener el emblema de la civilización

  return (
    <section id="my-civilization">
      <div className="wrapper">
        {/* Emblema de la Civilización */}
        <Image
          loading="eager"
          placeholder="blur"
          objectFit="contain"
          width={350}
          height={350}
          alt={cvzName}
          src={emblem.default.src}
          blurDataURL={emblem.default.src}
          title={`${civilization.name} Civilization`}
          style={{ marginLeft: '-1em' }}
        />

        <Details className="top" />
      </div>

      {/* Nombre de la Civilización */}
      <h1 className="civilization-name">{civilization.name} Civilization</h1>

      {/* Historia de la Civilización */}
      {isString(history) && !isEmptyString(history) && (
        <p className="civilization-history">{history}</p>
      )}

      {/* Historia de la civilización */}
      {isArray(history) && !isEmptyArray(history) && (
        <Fragment>
          {history.map((text, i) => (
            <Fragment key={i}>
              <p className="civilization-history">{text}</p>
              {i !== history.length - 1 ? <br /> : null}
            </Fragment>
          ))}
        </Fragment>
      )}

      <Details className="bottom" />
    </section>
  )
}

export default withRouter(Civilization)
