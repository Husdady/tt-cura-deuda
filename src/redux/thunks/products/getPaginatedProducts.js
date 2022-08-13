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
import { isFunction, isEmptyArray, isEmptyString } from '@utils/Validations'

/**
 * Obtener productos paginados
 * @param {types: Object, company: String, graphqlQuery: String, showLoading: Function, hideLoading: Function}
 * @returns
 */
export default function getPaginatedProducts({ types, company, graphqlQuery, showLoading, hideLoading }) {
  return async (dispatch, getState) => {
    try {
      /// Obtener estado de los filtros
      const { manageFilters } = getState()

      // Obtener filtros de cada compañia (Omnilife/Seytu)
      const { limit, searchValue, activeCategories, sortBy } = manageFilters[company]
      const { stock, maxPrice, minPrice, date, applyFiltersInSearch, applyFiltersInCategories, applyFiltersInSortBy } = getExtraFilters()

      // Mostrar loading en botón 'Cargar más productos'
      if (isFunction(showLoading)) showLoading()

      // Comprobar si el valor del buscador no está vacío y hay categorías marcadas
      const existSearchValueAndActiveCategories = !isEmptyString(searchValue) || !isEmptyArray(activeCategories)

      // Comprobar si está marcada una casilla en los filtros extras
      const applyFilters = [applyFiltersInSearch, applyFiltersInCategories, applyFiltersInSortBy].includes(true)

      // Comprobar si son filtros válidos
      const validFilter = !applyFilters && !existSearchValueAndActiveCategories

      // Setear filtros de query
      const filters = {
        title: JSON.stringify(searchValue),
        categories: JSON.stringify(activeCategories),
        stock: applyFilters || validFilter ? stock : null,
        maxPrice: applyFilters || validFilter ? maxPrice : null,
        minPrice: applyFilters || validFilter ? minPrice : null,
        date: applyFilters || validFilter ? date : null,
        sortBy: stringifyWithoutDoubleQuotes(sortBy),
      }

      // Graphql query
      const query = JSON.stringify({
        query: `query {
        ${graphqlQuery} (pagination: true, skip: 0, limit: ${limit},
          filters: {
            name: ${filters.title}
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

      // Obtener productos
      const APIProducts = data['data'][graphqlQuery]

      if (!APIProducts) return

      const field = company + 'Products'

      // Setear productos
      dispatch({
        type: types.setProducts,
        [field]: APIProducts,
      })

      // Ocultar 'Cargando productos'
      dispatch({ type: types.hideLoading })
    } catch (err) {
      // Mostrar error por consola
      console.error(`[getPaginatedProducts.${company}.error]`, err)

      // Mostrar error por pantalla
      message.error('A ocurrido un error al obtener los productos')
    }
  }

  // Ocultar loading en botón 'Cargar más productos'
  if (isFunction(hideLoading)) hideLoading()
}
