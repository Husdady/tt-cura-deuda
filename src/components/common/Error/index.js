// Librarys
import Image from 'next/image'
import PropTypes from 'prop-types'

export default function Error({ title, image }) {
  return (
    <div className="common-error">
      <Image
        loading="eager"
        objectFit="cover"
        width={image.width}
        height={image.height}
        src={image.url}
        alt={image.alt}
        title={image.title}
      />

      <h1 className="title">{title}</h1>
    </div>
  )
}

Error.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired
  })
}
