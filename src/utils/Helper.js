// Utils
import { isString } from './Validations'

export default class Helper {
  /**
   * Truncar texto, limitando a 'x' caracteres mostrando al final '...'
   * @param {str: String, limit: Number}
   * @returns
   */
  static truncate(str, limit = 100) {
    if (!isString(str)) {
      throw new Error(
        `The type ${typeof str} of first parameter needs to be a string`
      )
    }

    if (!Number(limit)) {
      throw new Error(`${limit} needs to be a number`)
    }

    if (str.length > limit) {
      return str.substring(0, limit) + '...'
    }

    return str
  }
}
