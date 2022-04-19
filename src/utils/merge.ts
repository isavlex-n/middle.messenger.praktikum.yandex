/* eslint-disable no-param-reassign */
export default function merge(lhs: Indexed, rhs: Indexed): Indexed {
  Object.keys(rhs).forEach((key) => {
    if (typeof rhs[key] === 'object') {
      if (typeof lhs[key] === 'undefined') lhs[key] = {}
      lhs[key] = merge(lhs[key] as Indexed, rhs[key] as Indexed)
    } else {
      lhs[key] = rhs[key]
    }
  })

  return lhs
}
