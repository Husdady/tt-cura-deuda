// Librarys
import { message } from 'antd'

// Eliminar producto favorito
export default function deleteFavoriteProduct({ product, types }) {
  return (dispatch) => {
    dispatch({
      type: types.deleteFavoriteProduct,
      productId: product._id,
    })

    message.warn(`Se ha eliminado el producto "${product.name}" de tus productos favoritos`)
  }
}
