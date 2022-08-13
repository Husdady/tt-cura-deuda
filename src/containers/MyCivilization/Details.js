// React
import { Fragment } from 'react'

// Librarys
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

// Utils
import { isEmptyArray } from '@utils/Validations'

export default function Details({ className }) {
  const myCivilization = useSelector((store) => store.my_civilization)

  return (
    <div className={`details ${className}`}>
      <h2 className="title">Details:</h2>

      {/* Expansión de la Civilización */}
      <span className="expansion">
        Expansion: {myCivilization.expansion || 'Unkown'}
      </span>

      {/* Tipo de ejército de la Civilización */}
      <span className="army-type">
        Army type:{' '}
        {myCivilization.army_type ||
          `The Army type of The ${myCivilization.name} Civilization Army is unkown`}
      </span>

      {/* Bono de equipo */}
      <span className="team-bonus">
        Team bonus:{' '}
        {myCivilization.team_bonus ||
          `The Team bonus of The ${myCivilization.name} Civilization Army is unkown`}
      </span>

      {/* Bono de equipo */}
      <span className="civilization-bonus">
        {!isEmptyArray(myCivilization.civilization_bonus) ? (
          <Fragment>
            Civilization bonus: {myCivilization.civilization_bonus.join(', ')}
          </Fragment>
        ) : (
          `The ${myCivilization.name} does not have bonus`
        )}
      </span>
    </div>
  )
}

Details.propTypes = {
  className: PropTypes.string.isRequired
}
