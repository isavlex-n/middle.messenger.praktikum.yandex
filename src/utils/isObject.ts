export default function isObject(val: unknown): Boolean {
  return typeof val === 'object'
                          && val !== null
                          && val.constructor === Object
                          && Object.prototype.toString.call(val) === '[object Object]'
}
