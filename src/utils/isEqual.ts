/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import isObject from './isObject'

function isArrayOrObject(value: Indexed) {
  return isObject(value) || Array.isArray(value)
}

export default function isEqual(
  a: Indexed,
  b: Indexed,
): Boolean {
  if (typeof a === 'string' && typeof b === 'string') {
    return a === b
  }
  if (Object.keys(a).length !== Object.keys(b).length) {
    return false
  }
  for (const [keyA, valueA] of Object.entries(a)) {
    const valueB = b[keyA]
    if (isArrayOrObject(valueA) && isArrayOrObject(valueB)) {
      if (isEqual(valueA, valueB)) {
        continue
      }
      return false
    }
    if (valueA !== valueB) {
      return false
    }
  }
  return true
}
