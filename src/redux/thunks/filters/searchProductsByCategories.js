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
import { isEmptyArray } from '@utils/Validations'

export default function searchProductsByCategories(extraData) {
  const {
    types, // Tipos que se reciben para usarlos en el dispatch
    company, // Compañia actual (Omnilife/Seytú)
    graphqlQuery, // Query de GraphQL
    activeCategories, // Categorías marcadas
    showLoading, // Función para mostrar loading
    hideLoading, // Función para ocultar loading
  } = extraData

  return async (dispatch, getState) => {
    try {
      const parsedActiveCategories = JSON.parse(activeCategories)

      // Si no hay categorías marcadas
      if (isEmptyArray(parsedActiveCategories)) {
        return message.warning('Ninguna categoría ha sido marcada', 6)
      }

      // Obtener productos y filtros
      const { manageFilters, manageProducts } = getState()

      // Obtener productos dependiendo de la compañia (Omnilife/Seytú)
      const { products } = manageProducts[company]

      // Obtener filtros dependiendo de la compañia (Omnilife/Seytú)
      const { limit, searchValue, sortBy } = manageFilters[company]

      // Obtener directamente los filtros actuales
      const { stock, maxPrice, minPrice, date, applyFiltersInCategories } = getExtraFilters()

      // Mostrar loading en botón 'Buscar por categorías'
      showLoading()

      // Mostrar loading
      dispatch({ type: types.showLoading })

      // Crear filtros de query
      const filters = {
        name: JSON.stringify(searchValue),
        categories: activeCategories,
        stock: applyFiltersInCategories ? stock : null,
        maxPrice: applyFiltersInCategories ? maxPrice : null,
        minPrice: applyFiltersInCategories ? minPrice : null,
        date: applyFiltersInCategories ? date : null,
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

      // Obtener los productos filtrados
      const filteredProducts = data['data'][graphqlQuery]

      // Si los productos filtrados son iguales a los productos actuales
      if (!filteredProducts) {
        throw new Error({ message: 'No se han encontrado productos con esas categorías' })
      }

      // Si los productos filtrados son iguales a los productos actuales
      if (filteredProducts === products) return

      const field = company + 'Products'

      // Setear usuarios filtrados
      dispatch({
        type: types.setProducts,
        [field]: filteredProducts,
      })

      // Después de medio seg
      setTimeout(() => {
        // Ocultar loading en botón 'Buscar por categorías'
        hideLoading()

        // Ocultar loading
        dispatch({ type: types.hideLoading })

        // Guardar filtros extras
        dispatch({
          type: types.saveExtraFilters,
          filters: {
            activeCategories: activeCategories ? parsedActiveCategories : [],
          },
        })
      }, 500)
    } catch (err) {
      console.log('[searchProductsByCategories]', err.response)
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
