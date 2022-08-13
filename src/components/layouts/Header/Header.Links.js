// Librarys
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { isEmptyObject } from '@root/src/utils/Validations'

export default function HeaderLinks() {
  const myCivilization = useSelector((store) => store.my_civilization)

  // Nombre de la civilización a minusculas
  const cvzName = !isEmptyObject(myCivilization)
    ? myCivilization.name.toLowerCase()
    : null

  // Obtener el emblema de la civilización
  const emblem = cvzName
    ? require('@public/img/civilizations/' + cvzName + '.webp')
    : null

  return (
    <ul className="links">
      {!isEmptyObject(myCivilization) && (
        <li className="link civilization">
          <Image
            loading="eager"
            placeholder="blur"
            objectFit="contain"
            width={40}
            height={40}
            alt={cvzName}
            src={emblem.default.src}
            blurDataURL={emblem.default.src}
            title={`${myCivilization.name} Civilization`}
          />

          <span style={{ marginLeft: 7 }}>
            {myCivilization.name} Civilization
          </span>
        </li>
      )}

      <li className="link">
        <FontAwesomeIcon icon="search" size="lg" />
      </li>

      <li className="link">
        <FontAwesomeIcon icon="bars" size="lg" />
      </li>
    </ul>
  )
}
