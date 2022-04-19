import namespace from './namespace'
import merge from './merge'

export default function set(
  object: Indexed | unknown,
  path: string,
  value: unknown,
): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object
  }
  const objectFromPath = namespace(path, value)
  return merge(object as Indexed, objectFromPath)
}
