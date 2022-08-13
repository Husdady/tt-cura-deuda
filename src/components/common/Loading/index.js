const squaresClasses = [
  null,
  null,
  'last',
  'clear',
  null,
  'last',
  'clear',
  null,
  'last'
]

export default function Loading() {
  return (
    <div className="container-loader">
      <div className="loading">
        {squaresClasses.map((squareClass, i) => {
          const squareClassNames = ['square', squareClass]
            .filter((htmlClass) => !!htmlClass)
            .join(' ')

          return <div key={i} className={squareClassNames}></div>
        })}
      </div>
    </div>
  )
}
