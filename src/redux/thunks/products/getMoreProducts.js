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
 * Obtener más productos
 * @param {skip: Number, skipMore: Function, types: Object, company: String, graphqlQuery: String, showLoading: Function, hideLoading: Function, hideLoadMoreButton: Function}
 * @returns
 */
export default function getMoreProducts({ skip, skipMore, types, company, graphqlQuery, showLoading, hideLoading, hideLoadMoreButton }) {
  return async (dispatch, getState) => {
    try {
      // Obtener estado de los filtros
      const { manageFilters, manageProducts } = getState()

      // Obtener filtros de cada compañia (Omnilife/Seytu)
      const { products } = manageProducts[company]

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
        ${graphqlQuery} (pagination: true, skip: ${skip}, limit: ${limit},
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

      // Obtener los productos que retorna la API
      const APIProducts = data['data'][graphqlQuery]

      // Si el servidor no trae los productos en formato Array
      if (!APIProducts) {
        throw new Error('A ocurrido un error al cargar más productos')
      }

      // Aumentar 'skip'
      skipMore()

      // Setear productos
      dispatch({
        type: types.addProducts,
        newProducts: APIProducts,
      })

      // Ocultar 'Cargando productos'
      dispatch({ type: types.hideLoading })

      // Si ya no hay productos para seguir mostrando, ocultar botón que carga más productos y mostrar mensaje exitoso
      if (!isEmptyArray(products) && isEmptyArray(APIProducts)) {
        isFunction(hideLoadMoreButton) && hideLoadMoreButton()
        return message.success('Todos los productos han sido cargados', 7)
      }

      // Omitir productos
      if (isFunction(skipMore)) skipMore()
    } catch (err) {
      // Mostrar mensaje de error por consola
      console.error('[getMoreProducts.error]', err)

      // Mostrar error por pantalla
      message.error(err.message)
    }

    // Ocultar loading en botón
    hideLoading()
  }
}
