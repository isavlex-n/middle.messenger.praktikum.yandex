import Block from '../../core/Block'
import validateInputHandler from '../../utils/validateInputHandler'
import { connect } from '../../utils/connect'
import authSevice from '../../services/auth'

class Login extends Block {
  async submitHandler(event: Event) {
    event.preventDefault()
    const login = this.refs.login.querySelector('input')!.value
    const password = this.refs.password.querySelector('input')!.value
    const loginData = {
      login,
      password,
    }

    Object.entries(loginData).forEach(([key, value]) => {
      this.setChildProps(`${key}Error`, {
        error: validateInputHandler(key, value),
      })
    })

    await authSevice.login(loginData)
  }

  inputFocusHandler(event: Event) {
    const target = event.target as HTMLInputElement
    this.setChildProps(`${target.name}Error`, { error: '' })
  }

  inputBlurHandler(event: Event) {
    const target = event.target as HTMLInputElement
    this.setChildProps(`${target.name}Error`, {
      error: validateInputHandler(target.name, target.value),
    })
  }

  protected getStateFromProps() {
    this.state = {
      button: {
        ref: 'button',
        text: 'Авторизоваться',
        type: 'submit',
        classMod: 'form__button_signin',
        events: {
          click: this.submitHandler.bind(this),
        },
      },
      inputs: [
        {
          ref: 'login',
          refError: 'loginError',
          name: 'login',
          text: 'Логин',
          id: 'form__login',
          type: 'text',
          value: '',
          events: {
            focusout: this.inputBlurHandler.bind(this),
            focusin: this.inputFocusHandler.bind(this),
          },
        },
        {
          ref: 'password',
          refError: 'passwordError',
          type: 'password',
          text: 'Пароль',
          id: 'form__password',
          name: 'password',
          value: '',
          events: {
            focusout: this.inputBlurHandler.bind(this),
            focusin: this.inputFocusHandler.bind(this),
          },
        },
      ],
    }
  }

  render() {
    return `<div class="flex fuul-height">
              <div class="centered">
              {{{Loader show=isLoading}}}
              <form class='form form_login'>
                <h1 class="form__header">Вход</h1>
                <div class='form__list'>
                  {{#each inputs}}
                    <div class="form__item">
                    {{{Input name=this.name
                            text=this.text
                            id=this.id
                            type=this.type
                            value=this.value
                            events=this.events
                            ref=this.ref
                      }}}
                      {{{InputError ref=this.refError}}}
                    </div>
                  {{/each}}
                  {{{InputError error=error}}}
                  <div class='form__list-item form__list-item_button'>
                    {{{Button
                      ref=button.ref
                      text=button.text
                      type=button.type
                      classMod=button.classMod
                      events=button.events
                    }}}
                  </div>
                  <div class='form__list-item'>
                    {{{Link textLink='Нет аккаунта?' classLink='form__link' link='/signup' to='/signup'}}}
                  </div>
                </div>
              </form>
              </div>
            </div>`
  }
}

const withLogin = connect((state) => ({
  error: state.error,
  user: state.user,
  isLoading: state.isLoading,
}))
export default withLogin(Login)
