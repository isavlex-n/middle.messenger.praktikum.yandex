export function validateInputHandler(target: HTMLInputElement) {
  const patterns: any = {
    first_name: /^[А-ЯA-Z][а-яёa-z\\-]+$/,
    second_name: /^[А-ЯA-Z][а-яёa-z\\-]+$/,
    login: /^[a-zA-Z][a-zA-Z0-9-_\\.]{1,20}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/,
    email: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
    phone: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
    message: ''
  }
  const targetName = target.name
  if(targetName === 're_password') return;
  const value = target.value
  return patterns[targetName].test(value)
}