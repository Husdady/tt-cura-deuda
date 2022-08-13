// React
import { useCallback, memo } from 'react'

// Librarys
import Image from 'next/image'
import { withRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

// Actions
import actions from '@redux/actions'

// Utils
import Helper from '@utils/Helper'
import { isArray } from '@utils/Validations'

const civilizations = require('@public/data/civilizations.json')

function Civilization({ name, router, ...props }) {
  // Encontrar la actual civilización
  const civilizationFound = civilizations.find(
    (civilization) => civilization.civilizationId === props.id
  )

  // Obtener la historia de la actual civilización
  const history = isArray(civilizationFound.history)
    ? civilizationFound.history[1]
    : civilizationFound.history

  const cvzName = name.toLowerCase() // Nombre de la civilización a minusculas
  const emblem = require('@public/img/civilizations/' + cvzName + '.webp') // Obtener el emblema de la civilización
  const dispatch = useDispatch() // Uso de dispatch

  const handleSelectCivilization = useCallback(() => {
    // Obtener la acción que selecciona una civilización
    const { selectCivilization } = dispatch(actions)

    const civilization = {
      name: name,
      ...props
    }

    delete civilization.router

    // Seleccionar una civilización
    selectCivilization(civilization)

    router.push(`/civilizations/${cvzName}`)
  }, [])

  return (
    <article
      onClick={handleSelectCivilization}
      className={`civilization ${cvzName}`}
    >
      <Image
        loading="eager"
        placeholder="blur"
        objectFit="contain"
        width={145}
        height={145}
        alt="age-of-empires-logo"
        src={emblem.default.src}
        blurDataURL={emblem.default.src}
        title={`${name} Civilization`}
      />

      <h2 className="civilization-name">{name}</h2>
      <p className="civilization-history">{Helper.truncate(history, 140)}</p>
    </article>
  )
}

const CivilizationWithRouter = withRouter(Civilization)

export default memo(CivilizationWithRouter)

Civilization.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  expansion: PropTypes.string.isRequired,
  army_type: PropTypes.string.isRequired,
  unique_unit: PropTypes.arrayOf(PropTypes.string).isRequired,
  team_bonus: PropTypes.string.isRequired,
  civilization_bonus: PropTypes.arrayOf(PropTypes.string).isRequired
}
