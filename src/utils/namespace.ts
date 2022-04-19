export default function namespace(str: string, value: any): Indexed {
  const splitString = str.split('.')

  return splitString.reduceRight<Indexed>((acc, key) => ({ [key]: acc }), value as any)
}
