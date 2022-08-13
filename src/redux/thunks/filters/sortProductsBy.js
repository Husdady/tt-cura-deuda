// Librarys
import axios from '@api/axios'
import { message } from 'antd'

// API
import { API_URL } from '@api/credentials'

// Reducers
import { getExtraFilters } from '@redux/reducers/filters'

// Utils
import fragments from '@utils/fragments'
import { stringifyWithoutDoubleQuotes } from '@utils/Helper'

/**
 * Ordernar productos por ...
 * @param {key: String, extraData: Object}
 * @returns
 */
export default function sortProductsBy(key, extraData) {
  const { types, company, graphqlQuery } = extraData

  return async (dispatch, getState) => {
    try {
      // Obtener productos y filtros
      const { manageFilters, manageProducts } = getState()

      // Obtener productos dependiendo de la compañia (Omnilife/Seytú)
      const { products } = manageProducts[company]

      // Obtener filtros dependiendo de la compañia (Omnilife/Seytú)
      const { limit, activeCategories, searchValue } = manageFilters[company]

      // Obtener directamente los filtros actuales
      const { stock, maxPrice, minPrice, date, applyFiltersInSortBy } = getExtraFilters()

      // Mostrar loading
      dispatch({ type: types.showLoading })

      // Obtener la query para ordenar los productos
      const sortBy = getSortByQuery({
        key: key,
        types: types,
      })

      // Setear filtros de query
      const filters = {
        name: JSON.stringify(searchValue),
        categories: JSON.stringify(activeCategories),
        stock: applyFiltersInSortBy ? stock : null,
        maxPrice: applyFiltersInSortBy ? maxPrice : null,
        minPrice: applyFiltersInSortBy ? minPrice : null,
        date: applyFiltersInSortBy ? date : null,
        sortBy: stringifyWithoutDoubleQuotes(sortBy),
      }

      // GrapqQL query
      const query = JSON.stringify({
        query: `query {
        ${graphqlQuery}(pagination: true, limit: ${limit}, filters: {
          name: ${filters.name}
          categories: ${filters.categories}
          stock: ${filters.stock}
          maxPrice: ${filters.maxPrice}
          minPrice: ${filters.minPrice}
          date: ${filters.date}
          sortBy: ${filters.sortBy}
          excludeFields: ["sortBy"]
        }) {
          ...ProductsFragment
        }}

        ${fragments.products}`,
      })

      const { data } = await axios({
        method: 'POST',
        url: `${API_URL}/api/graphql`,
        data: query,
      })

      // Obtener los productos traidos de la API
      const APIProducts = data['data'][graphqlQuery]

      // Si los productos filtrados son iguales a los productos actuales
      if (APIProducts === products) return

      const field = company + 'Products'

      // Setear usuarios filtrados
      dispatch({
        type: types.setProducts,
        [field]: APIProducts,
      })

      // Ocultar loading
      dispatch({ type: types.hideLoading })

      // Guardar filtros extras
      dispatch({
        type: types.saveExtraFilters,
        filters: {
          sortKey: key,
          sortBy: sortBy,
        },
      })
    } catch (err) {
      // Mostrar error por consola
      console.error(`[sortProductsBy.${company}.error]`, err)

      // Si no hay respuesta del servidor
      if (!err.response) {
        const txt = 'A ocurrido un error al ordenar los productos. Inténtelo más tarde'
        return message.error(txt, 8)
      }

      // Mostrar error por pantalla
      return message.error(err.message, 6)
    }
  }

  // Ocultar loading
  dispatch({ type: types.hideLoading })
}

/**
 * Obtener la query para ordenar productos
 * @param {key: String, types: Object}
 * @returns
 */
function getSortByQuery({ key, types }) {
  const sortByType = {
    // Ordenar los productos por los más nuevos
    [types.sortByNewest]: { createdAt: -1 },

    // Ordenar por los productos por los más antiguos
    [types.sortByOldest]: { createdAt: 1 },

    // Ordenar los productos por nombre ascendente
    [types.sortByAscName]: { name: 1 },

    // Ordenar los productos por nombre descendente
    [types.sortByDescName]: { name: -1 },

    // Ordenar los productos por nombre descendente
    [types.sortByHighestStock]: { stock: -1 },

    // Ordenar los productos por nombre descendente
    [types.sortByMinorStock]: { name: 1 },

    // Ordenar los productos por nombre descendente
    [types.sortByMostPopular]: { totalVisits: -1 },

    // Ordenar los productos por nombre descendente
    [types.sortByLeastPopular]: { totalVisits: 1 },

    // Ordenar los productos por nombre descendente
    [types.sortByMostCheapest]: { price: 1 },

    // Ordenar los productos por nombre descendente
    [types.sortByMostExpensive]: { price: -1 },
  }

  return sortByType[key]
}
