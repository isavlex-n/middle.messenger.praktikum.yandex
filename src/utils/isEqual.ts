/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */

type PlainObject<T = unknown> = {
  [k in string]: T
}

function isArray(value: unknown): value is [] {
  return Array.isArray(value)
}

function isPlainObject(value: unknown): value is PlainObject {
  return (
    typeof value === 'object'
    && value !== null
    && value.constructor === Object
    && Object.prototype.toString.call(value) === '[object Object]'
  )
}
function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value)
}

export default function isEqual(lhs: PlainObject, rhs: PlainObject) {
  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key]
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      // Здесь value и rightValue может быть только массивом или объектом
      // и TypeScript это понимает с помощью Type Guard
      if (isEqual(value, rightValue)) {
        continue
      }
      return false
    }

    if (value !== rightValue) {
      return false
    }
  }

  return true
}
