// Librarys
import axios from '@api/axios'
import { message } from 'antd'

// API
import { API_URL } from '@api/credentials'

// Utils
import { getISODate, stringifyWithoutDoubleQuotes, setExtraFiltersMessage } from '@utils/Helper'
import fragments from '@utils/fragments'
import { isEmptyArray, isString, isEmptyString } from '@utils/Validations'

export default function applyExtraFilters(extraData) {
  const { values, types, company, graphqlQuery, showLoading, hideLoading } = extraData

  return async (dispatch, getState) => {
    try {
      // Obtener productos y filtros
      const { manageFilters, manageProducts } = getState()
      const { products } = manageProducts[company]
      const { limit, searchValue, activeCategories, sortBy } = manageFilters[company]

      // Mostrar loading en botón 'Aplicar filtros'
      showLoading()

      // Mostrar loading
      dispatch({ type: types.showLoading })

      const name = JSON.stringify(searchValue)
      const categories = JSON.stringify(activeCategories)

      // Crear filtros extras
      const filters = {
        name: values.applyFiltersInSearch ? name : null,
        categories: values.applyFiltersInCategories ? categories : null,
        stock: values.stock,
        maxPrice: Number(values.maxPrice),
        minPrice: Number(values.minPrice),
        date: null,
        sortBy: stringifyWithoutDoubleQuotes(sortBy),
      }

      // Si la fecha es de tipo String
      if (isString(values.date) && !isEmptyString(values.date)) {
        const ISODate = getISODate({
          symbol: '/',
          value: values.date,
        })

        filters.date = ISODate
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
      // console.log('[query]', query)
      const { data } = await axios({
        method: 'POST',
        url: `${API_URL}/api/graphql`,
        data: query,
      })

      // Obtener los productos filtrados por nombre
      const productsFiltered = data['data'][graphqlQuery]

      if (!productsFiltered) return

      // Si no existen productos filtrados
      if (isEmptyArray(productsFiltered)) {
        // Mostrar mensaje que muestra los filtros que se están aplicando
        const extraFiltersMessage = setExtraFiltersMessage({
          stock: filters.stock,
          maxPrice: filters.maxPrice,
          minPrice: filters.minPrice,
          date: filters.date,
          defaultDate: values.date,
          activeCategories: {
            value: filters.activeCategories,
            productCategories: manageProducts[company].categories,
          },
        })

        message.warning(`No se han encontrado productos con los siguientes filtros: (${extraFiltersMessage})`)
      }

      const field = company + 'Products'

      // Setear usuarios filtrados
      dispatch({
        type: types.setProducts,
        [field]: productsFiltered,
      })

      setTimeout(() => {
        // Ocultar loading en botón 'Aplicar filtros'
        hideLoading()

        // Ocultar loading
        dispatch({ type: types.hideLoading })

        // Si existen productos filtrados
        if (!isEmptyArray(productsFiltered)) {
          // Mostrar mensaje exitoso
          message.success('Se han aplicado los filtros')
        }
      }, 100)
    } catch (err) {
      // Ocultar loading en botón 'Aplicar filtros'
      hideLoading()

      // Ocultar loading
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
