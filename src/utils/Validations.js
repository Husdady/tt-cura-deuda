// Comprobar si es un string
export function isString(str) {
  return typeof str === 'string'
}

// Comprobar si es un string vacío
export function isEmptyString(str) {
  if (!isString(str)) return false
  return str.length === 0
}

// Comprobar si es un número
export function isNumber(number) {
  return typeof number === 'number'
}

// Comprobar si es un valor booleano
export function isBoolean(data) {
  return typeof data === 'boolean'
}

// Comprobar si es una función
export function isFunction(func) {
  return typeof func === 'function'
}

// Comprobar si es un arreglo
export function isArray(array) {
  return Array.isArray(array)
}

// Comprobar si es un arreglo vacío
export function isEmptyArray(array) {
  if (!isArray(array)) return false
  return array.length === 0
}

// Comprobar si es un valor verdadero
export function isTrue(data) {
  return isBoolean(data) && data === true
}

// Comprobar si es un valor falseo
export function isFalse(data) {
  return isBoolean(data) && data === false
}

// Comprobar si es un número
export function isUndefined(data) {
  return typeof data === 'undefined'
}

// Comprobar si es un objeto
export function isObject(obj) {
  return typeof obj === 'object' && !isArray(obj) && obj !== null
}

// Comprobar si es un objeto vacío
export function isEmptyObject(obj) {
  return isObject(obj) && Object.keys(obj).length === 0
}

// Comprobar si el objeto 'window' está disponible
export function isWindowAvailable() {
  return typeof window !== 'undefined'
}
