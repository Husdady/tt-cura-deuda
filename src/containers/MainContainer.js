// React
import { Fragment } from 'react'

// Librarys
import PropTypes from 'prop-types'

// Components
import Header from '@layouts/Header'

// Librarys
import dynamic from 'next/dynamic'

const Footer = dynamic(() => import('@layouts/Footer'))

export default function MainContainer({ head, children }) {
  return (
    <Fragment>
      {head}
      <Header />
      <main id="root" role="main">
        <div className="wrap" />
        <div className="wrapper">{children}</div>
      </main>
      <Footer />
    </Fragment>
  )
}

const ReactNode = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node
]).isRequired

MainContainer.propTypes = {
  head: ReactNode,
  children: ReactNode
}
