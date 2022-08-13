// React
import { Fragment } from 'react'

// Librarys
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

// Utils
import { isEmptyArray } from '@utils/Validations'

export default function Details({ className }) {
  const civilization = useSelector((store) => store.civilization)

  return (
    <div className={`details ${className}`}>
      <h2 className="title">Details:</h2>

      {/* Expansión de la Civilización */}
      <span className="expansion">
        Expansion: {civilization.expansion || 'Unkown'}
      </span>

      {/* Tipo de ejército de la Civilización */}
      <span className="army-type">
        Army type:{' '}
        {civilization.army_type ||
          `The Army type of The ${civilization.name} Civilization Army is unkown`}
      </span>

      {/* Bono de equipo */}
      <span className="team-bonus">
        Team bonus:{' '}
        {civilization.team_bonus ||
          `The Team bonus of The ${civilization.name} Civilization Army is unkown`}
      </span>

      {/* Bono de equipo */}
      <span className="civilization-bonus">
        {!isEmptyArray(civilization.civilization_bonus) ? (
          <Fragment>
            Civilization bonus: {civilization.civilization_bonus.join(', ')}
          </Fragment>
        ) : (
          `The ${civilization.name} does not have bonus`
        )}
      </span>
    </div>
  )
}

Details.propTypes = {
  className: PropTypes.string.isRequired
}
