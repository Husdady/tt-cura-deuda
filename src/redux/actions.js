// Statics
import * as statics from '@redux/statics'

export default function actions(dispatch) {
  return {
    // Actualizar el nombre del usuario
    changeUsername: (newUsername) => {
      return dispatch({
        type: statics.CHANGE_USERNAME,
        payload: newUsername
      })
    },

    // Seleccionar una civilización
    selectCivilization: (civilization) => {
      return dispatch({
        type: statics.SELECT_CIVILIZATION,
        payload: civilization
      })
    },

    // Guardar civilizaciones
    saveCivilizations: (civilizations) => {
      return dispatch({
        type: statics.SAVE_CIVILIZATIONS,
        payload: civilizations
      })
    }
  }
}
