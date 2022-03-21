export const data = {
  button: {
    text: 'Авторизоваться',
  },
  mod: 'login',
  header: 'Вход',
  inputs: [
    {
      name: 'login',
      text: 'Логин',
      id: 'form__login',
      type: 'text',
      error: 'Неверный логин',
    },
    {
      type: 'password',
      text: 'Пароль',
      id: 'form__password',
      name: 'password',
      error: 'Неверный пароль',
    },
  ],
  buttonText: 'Авторизоваться',
  buttonClass: 'form__button_signin',
  link: '/signup',
  textLink: 'Нет аккаунта?',
}