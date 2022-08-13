// React
import { useCallback, memo } from 'react'

// Librarys
import Image from 'next/image'
import { withRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

// Redux
import actions from '@redux/actions'

function Civilization({ name, router, ...props }) {
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

    router.push('/my-civilization')
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
