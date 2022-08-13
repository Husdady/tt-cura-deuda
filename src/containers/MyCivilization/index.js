// React
import { Fragment } from 'react'

// Librarys
import Image from 'next/image'
import { useSelector } from 'react-redux'

// Utils
import {
  isString,
  isEmptyString,
  isArray,
  isEmptyArray
} from '@utils/Validations'
import Details from './Details'

const civilizations = require('@public/data/civilizations')

export default function MyCivilization() {
  const myCivilization = useSelector((store) => store.my_civilization)

  const { history } = civilizations.find(
    (civilization) => civilization.civilizationId === myCivilization.id
  )

  const cvzName = myCivilization.name.toLowerCase() // Nombre de la civilización a minusculas
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
          title={`${myCivilization.name} Civilization`}
          style={{ marginLeft: '-1em' }}
        />

        <Details className="top" />
      </div>

      {/* Nombre de la Civilización */}
      <h1 className="civilization-name">{myCivilization.name} Civilization</h1>

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
