import Block from '../../core/Block'
import validateInputHandler from '../../utils/validateInputHandler'
import { connect } from '../../utils/connect'
import authService from '../../services/auth'

class Signup extends Block {
  submitHandler(event: Event) {
    event.preventDefault()
    const login = this.refs.login.querySelector('input')!.value
    const password = this.refs.password.querySelector('input')!.value
    const re_password = this.refs.re_password.querySelector('input')!.value
    const email = this.refs.email.querySelector('input')!.value
    const first_name = this.refs.first_name.querySelector('input')!.value
    const second_name = this.refs.second_name.querySelector('input')!.value
    const phone = this.refs.phone.querySelector('input')!.value
    const loginData = {
      login,
      password,
      re_password,
      email,
      first_name,
      second_name,
      phone,
    }

    Object.entries(loginData).forEach(([key, value]) => {
      console.log(`${key}: ${value}`)
      this.setChildProps(`${key}Error`, {
        error: validateInputHandler(key, value),
      })
    })

    authService.signup(loginData)
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
        text: 'Зарегистрироваться',
        type: 'submit',
        classMod: 'form__button_signin',
        events: {
          click: this.submitHandler.bind(this),
        },
      },
      inputs: [
        {
          ref: 'email',
          refError: 'emailError',
          type: 'email',
          name: 'email',
          text: 'Почта',
          id: 'form__email',
          required: true,
          events: {
            focusout: this.inputBlurHandler.bind(this),
            focusin: this.inputFocusHandler.bind(this),
          },
        },
        {
          ref: 'login',
          refError: 'loginError',
          type: 'text',
          name: 'login',
          text: 'Логин',
          id: 'form__login',
          required: true,
          events: {
            focusout: this.inputBlurHandler.bind(this),
            focusin: this.inputFocusHandler.bind(this),
          },
        },

        {
          ref: 'first_name',
          refError: 'first_nameError',
          type: 'text',
          name: 'first_name',
          id: 'form__first-name',
          text: 'Имя',
          required: true,
          events: {
            focusout: this.inputBlurHandler.bind(this),
            focusin: this.inputFocusHandler.bind(this),
          },
        },
        {
          ref: 'second_name',
          refError: 'second_nameError',
          type: 'text',
          name: 'second_name',
          id: 'form__second-name',
          text: 'Фамилия',
          required: true,
          events: {
            focusout: this.inputBlurHandler.bind(this),
            focusin: this.inputFocusHandler.bind(this),
          },
        },
        {
          ref: 'phone',
          refError: 'phoneError',
          type: 'tel',
          name: 'phone',
          id: 'form__phone',
          text: 'Телефон',
          required: true,
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
          required: true,
          events: {
            focusout: this.inputBlurHandler.bind(this),
            focusin: this.inputFocusHandler.bind(this),
          },
        },
        {
          ref: 're_password',
          refError: 're_passwordError',
          type: 'password',
          text: 'Пароль (ещё раз)',
          id: 'form__password-repeat',
          name: 're_password',
          required: true,
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
              <form class='form form_sigin'>
                <h1 class="form__header">Регистрация</h1>
                <div class='form__list'>
                  {{#each inputs}}
                  <div class="form__item">
                    {{{Input name=this.name
                            text=this.text
                            id=this.id
                            type=this.type
                            value=this.value
                            events=this.events
                            required=this.required
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
                    {{{Link textLink='Войти' classLink='form__link' link='/signin' to='/signin'}}}
                  </div>
                </div>
              </form>
              </div>
            </div>`
  }
}

const withSignup = connect((state) => ({
  user: state.user,
  isLoading: state.isLoading,
  error: state.error,
}))

export default withSignup(Signup)
