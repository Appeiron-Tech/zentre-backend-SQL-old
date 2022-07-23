import { parse } from 'path'

//https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
export async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

export function isEmpty(obj: any): boolean {
  return Object.keys(obj).length === 0
}

export function editFileName(req, file, callback) {
  const name = file.originalname.split('.')[0]
  const fileExtName = parse(file.originalname).ext
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('')
  callback(null, `${name}-${randomName}${fileExtName}`)
}

export function getExtension(fileName: string): string {
  return fileName.split('.').pop()
}

export function roundNumber(num: number): number {
  const m = Number((Math.abs(num) * 100).toPrecision(15))
  return (Math.round(m) / 100) * Math.sign(num)
}

export function toPhoneFormat(params: { area_code: string; number: string }): string {
  const { area_code, number } = { ...params }
  if (area_code) {
    return area_code.concat(' ').concat(number)
  }
  return number
}

export function toAddressFormat(params: {
  zip_code: string
  street_name: string
  street_number: string
}): string {
  let { zip_code, street_name, street_number } = { ...params }
  if (!zip_code && !street_name && !street_number) {
    return ''
  }
  zip_code = zip_code || ''
  street_name = street_name || ''
  street_number = street_number || ''
  return zip_code + ' | ' + street_name + ' | ' + street_number
}
