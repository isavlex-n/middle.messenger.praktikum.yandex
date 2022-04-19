export default function queryStringify(data: Indexed): string {
  if (typeof data !== "object") {
    throw new Error("Data must be object");
  }
  const keys: string[] = Object.keys(data)
  return keys.reduce((result, key, index) => {
    const value = data[key]
    const endOfString: string = index < keys.length - 1 ? '&' : ''
    if (Array.isArray(value)) {
      const arrObject = value.reduce((arrayResult, arrayValue, arrayIndex) => ({
        ...arrayResult,
        [`${key}[${arrayIndex}]`]: arrayValue,
      }), {})
      return `${result}${queryStringify(arrObject)}${endOfString}`
    }
    if (typeof value === 'object') {
      const objObject = Object.keys(value).reduce((objResult, objKey) => ({
        ...objResult,
        [`${key}[${objKey}]`]: value[objKey],
      }), {})
      return `${result}${queryStringify(objObject)}${endOfString}`
    }

    return `${result}${key}=${value}${endOfString}`
  }, '')
}
