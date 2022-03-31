import Block from '../../core/Block'

export class Signup extends Block {
  protected getStateFromProps() {
    this.state = {
      data: {
        button: {
          text: 'Зарегистрироваться',
        },
        mod: 'sigin',
        header: 'Регистрация',
        inputs: [
          {type: 'email', name: 'email', text: 'Почта', id: 'form__email', },
          {type: 'text', name: 'login', text: 'Логин', id: 'form__login', },
          
          {type: 'text', name: 'first_name', id: 'form__first-name', text: 'Имя'},
          {type: 'text', name: 'second_name', id: 'form__second-name', text: 'Фамилия'},
          {type: 'tel', name: 'phone', id: 'form__phone', text: 'Телефон'},
          {
            type: 'password',
            text: 'Пароль',
            id: 'form__password',
            name: 'password',
          },
          {
            type: 'password',
            text: 'Пароль (ещё раз)',
            id: 'form__password-repeat',
            name: 'password',
            error: 'Пароли не совпадают'
          },
        ],
        link: '/login',
        textLink: 'Войти',
      }
    }
  }
  render () {
    return `
    <div class="flex fuul-height">
      <div class="centered">
        {{{Form data=data}}}
      </div>
    </div>
  `
  }
}