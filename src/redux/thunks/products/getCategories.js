// Librarys
import axios from '@api/axios'
import { message } from 'antd'

// API
import { API_URL } from '@api/credentials'

// Utils
import { isEmptyArray } from '@utils/Validations'
import { convertEmptySpacesInHyphens } from '@utils/Helper'

const time = 7
const errorMessage = 'A ocurrido un error para obtener las categorías. Inténtalo más tarde'

export default function getCategories(config) {
  return async (dispatch, getReduxStore) => {
    const { types, company, graphqlQuery } = config

    // Graphql query
    const query = JSON.stringify({
      query: `query {
        ${graphqlQuery} {
          _id
          name
        }
      }`,
    })

    // Obtener productos y filtros
    const { manageProducts, manageFilters } = getReduxStore()

    // Obtener las categorías que han sido marcadas
    const { activeCategories } = manageFilters[company]

    // Obtener las actuales categorías que se están mostrando
    const currentCategories = manageProducts[company].categories

    // Si ya se han cargado las categorías, mostrar loading
    if (!isEmptyArray(currentCategories)) {
      dispatch({ type: types.showLoading })
    }

    try {
      const { data } = await axios({
        method: 'POST',
        url: `${API_URL}/api/graphql`,
        data: query,
      })

      // Obtener categorías de los productos desde la API
      const APICategories = data['data'][graphqlQuery]

      if (APICategories === currentCategories || !APICategories) return

      const field = company + 'Categories'

      const categories = APICategories.map((category) => ({
        ...category,
        key: convertEmptySpacesInHyphens(category.name),
        status: isEmptyArray(activeCategories) ? true : activeCategories?.some((categoryId) => categoryId === category._id),
      }))

      // Setear categorías de productos
      dispatch({
        type: types.setCategories,
        [field]: categories,
      })

      dispatch({ type: types.hideLoading })
    } catch (err) {
      // Mostrar error por consola
      console.error(`[getCategories.${company}.error]`, err)

      // Mostrar error por pantalla
      message.error(errorMessage, time)
    }
  }
}
