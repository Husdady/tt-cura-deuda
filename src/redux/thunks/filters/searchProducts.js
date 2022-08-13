// Librarys
import axios from '@api/axios'
import { message } from 'antd'

// API
import { API_URL } from '@api/credentials'

// Reducers
import { getExtraFilters } from '@redux/reducers/filters'

// Utils
import fragments from '@utils/fragments'
import { isEmptyArray } from '@utils/Validations'
import { stringifyWithoutDoubleQuotes, setExtraFiltersMessage } from '@utils/Helper'

export default function searchProducts(config) {
  const { value, types, company, graphqlQuery } = config

  return async (dispatch, getState) => {
    try {
      const { manageFilters, manageProducts } = getState()

      const { products, categories } = manageProducts[company]
      const { limit, activeCategories, sortBy } = manageFilters[company]
      const { stock, maxPrice, minPrice, date, defaultDate, applyFiltersInSearch } = getExtraFilters()

      // Mostrar loading
      dispatch({ type: types.showLoading })

      // Crear filtros de query
      const filters = {
        name: JSON.stringify(value),
        categories: JSON.stringify(activeCategories),
        stock: applyFiltersInSearch ? stock : null,
        maxPrice: applyFiltersInSearch ? maxPrice : null,
        minPrice: applyFiltersInSearch ? minPrice : null,
        date: applyFiltersInSearch ? date : null,
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

      // Obtener los productos filtrados por nombre
      const productsFound = data['data'][graphqlQuery]

      // Si los productos encontrados son iguales a los productos actuales
      if (isEmptyArray(productsFound)) {
        // Mostrar mensaje que muestra los filtros que se están aplicando
        const extraFiltersMessage = setExtraFiltersMessage({
          stock: filters.stock,
          maxPrice: filters.maxPrice,
          minPrice: filters.minPrice,
          date: filters.date,
          defaultDate: defaultDate,
          activeCategories: { value: activeCategories, productCategories: categories },
        })

        message.warning(`No se han encontrado productos con la búsqueda: "${value}"${isEmptyArray(extraFiltersMessage) ? '.' : `, ${extraFiltersMessage}`}`, 8)
      }

      // Si los productos filtrados son iguales a los productos actuales
      if (productsFound === products) return

      const field = company + 'Products'

      // Setear usuarios filtrados
      dispatch({
        type: types.setProducts,
        [field]: productsFound,
      })

      // Ocultar loading
      dispatch({ type: types.hideLoading })

      // Guardar filtros extras
      dispatch({
        type: types.saveExtraFilters,
        filters: {
          searchValue: value,
        },
      })
    } catch (err) {
      dispatch({ type: types.hideLoading })

      // Si no hay respuesta del servidor
      if (!err.response) {
        message.error('A ocurrido un error al buscar productos. Inténtelo más tarde', 8)
      }

      // Si se recibe un error, mostrarlo
      if (err.message) {
        message.error(err.message, 6)
      }
    }
  }
}
