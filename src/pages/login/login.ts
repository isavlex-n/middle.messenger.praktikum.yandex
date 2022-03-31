import Block from '../../core/Block'
export class Login extends Block {
  protected getStateFromProps() {
    this.state = {
      data: {
        button: {
          text: 'Авторизоваться',
          onClick: () => console.log('click')
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
    }
  }

  render() {
    return `<div class="flex fuul-height">
    <div class="centered">
      {{{Form data=data}}}
    </div>
  </div>`
  }
}
