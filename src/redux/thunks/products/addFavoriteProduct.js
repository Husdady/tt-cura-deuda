// Librarys
import { message } from 'antd'

// Añadir producto favorito
export default function addFavoriteProduct({ product, types }) {
  return (dispatch) => {
    dispatch({
      type: types.addFavoriteProduct,
      favoriteProduct: product,
    })

    message.success(`Se ha añadido el producto "${product.name}" a la sección de "Mis productos favoritos"`)
  }
}
