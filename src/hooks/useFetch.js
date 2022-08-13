/* eslint-disable react-hooks/exhaustive-deps */
// React
import { useState, useCallback, useMemo } from 'react'

// Librarys
import axios from 'axios'
import { isString } from '@utils/Validations'

// Hooks
import useMounted from './useMounted'

// Services
import { PUBLIC_URL } from '@root/src/utils/credentials'

const extraDataProps = {
  callback: null,
  stopFetch: false
}

export default function useFetch(url, extraData = extraDataProps) {
  const [data, setData] = useState(null) // Definir una data inicial
  const [errors, setErrors] = useState({}) // Definir errores iniciales
  const [isLoading, setLoading] = useState(true) // Comprobar si está obteniendo los datos
  const isValidUrl = useMemo(() => isString(url), []) // Validar la url

  const getData = useCallback(({ source }) => {
    if (!isValidUrl) return false // Finalizar función sino es una válida url

    // Finalizar función si debe parar de solicitar información a la API
    if (extraData.stopFetch) {
      return setTimeout(() => {
        setLoading(false)
      }, 3000)
    }

    const options = {
      mode: 'no-cors',
      cancelToken: source.token,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': PUBLIC_URL
      }
    }

    axios
      .get(url, options) // Pasamos como parametro un token temporal
      .then((res) => {
        setData(res.data) // Actualizamos los datos
        extraData.callback({
          data: res.data,
          updateData: res.setData
        })
      })
      .catch((err) => {
        setErrors({
          error: err.response?.data, // Obtener el error
          status: err.response?.status, // Obtener el estado del error
          message: 'An error ocurred for getting the data' // Mensaje
        })
      })
      .finally(() => setLoading(false))
  }, [])

  useMounted(() => {
    const source = axios.CancelToken.source() // Creamos un token temporal
    getData({ source: source }) // Obtener datos de una API

    return () => {
      source.cancel() // Eliminamos el token, si el componente se desmonta
    }
  }, [])

  // Si es una url inválida, retornar un error
  if (!isValidUrl) {
    throw new Error(`${url} is not a valid url`)
  }

  // Retornar los estados disponibles
  return {
    data: data,
    errors: errors,
    isLoading: isLoading
  }
}
