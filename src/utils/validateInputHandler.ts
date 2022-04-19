/* eslint-disable no-useless-escape */
type TRegexpObject = {
  [key: string]: RegExp
}

export default function validateInputHandler(name: string, value: string | undefined) {
  const patterns: TRegexpObject = {
    first_name: /^[А-ЯA-Z][а-яёa-z\\-]+$/,
    second_name: /^[А-ЯA-Z][а-яёa-z\\-]+$/,
    login: /^[a-zA-Z][a-zA-Z0-9-_\\.]{1,20}$/,
    old_password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/,
    email: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
    phone: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
    message: /[А-Яа-яёA-za-z0-9]+/,
  }

  const errorMessages: TStringObject = {
    first_name: 'Неправильное имя',
    second_name: 'Неправильная фамилия',
    login: 'Неправильный логин',
    password: 'Неправльный пароль',
    old_password: 'Неправильный старый пароль',
    email: 'Неправильная почта',
    phone: 'Неправильный телефон',
  }
  if (name === 're_password') {
    const passValue = document.querySelector<HTMLInputElement>('[name="password"]')?.value
    if (passValue !== value || !value) {
      console.log(passValue, 'first')
      console.log(value, 'second')
      return 'Пароли не совпадают'
    }
    return ''
  }
  return patterns[name].test(value!) ? '' : errorMessages[name]
}

export function isValid(data: TStringObject) {
  return Object.entries(data).every(
    ([key, value]) => !validateInputHandler(key, value),
  )
}
