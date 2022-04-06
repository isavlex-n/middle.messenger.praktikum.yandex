import Block from '../../core/Block'
import {validateInputHandler} from '../../core/utils'

export class Signup extends Block {
  submitHandler(event: Event) {
    event.preventDefault()

    const loginData = {
      login: this.refs.login.querySelector('input')!.value,
      password: this.refs.password.querySelector('input')!.value,
      email: this.refs.email.querySelector('input')!.value,
      firstName: this.refs.first_name.querySelector('input')!.value,
      secondName: this.refs.second_name.querySelector('input')!.value,
      phone: this.refs.phone.querySelector('input')!.value,
    }
    console.log(loginData)
  }



  inputBlurHandler(event: Event) {

    const target = event.target as HTMLInputElement
    const inputs = this.state.inputs
    const indexOfInput = this.state.inputs.findIndex((input: TStringObject) => input.name === target.name)
    if (target.name === 're_password') {
      const passValue = this.refs.password.querySelector('input')!.value
      if (passValue !== target.value) {
        this.setChildProps(target.name, {
          ...inputs[indexOfInput],
          error: inputs[indexOfInput].errorMessage,
          value: target.value,
        })
      } else {
        this.setChildProps(target.name, {
          ...inputs[indexOfInput],
          error: '',
          value: target.value,
        })
      }
      return
    }

    if (!validateInputHandler(<HTMLInputElement>event.target)) {
      this.setChildProps(target.name, {
        ...inputs[indexOfInput],
        error: inputs[indexOfInput].errorMessage,
        value: target.value,
      })
    } else {
      this.setChildProps(target.name, {
        ...inputs[indexOfInput],
        error: '',
        value: target.value,
      })
    }
  }
  protected getStateFromProps() {
    this.state = {
      button: {
        ref: 'button',
        text: 'Зарегистрироваться',
        type: 'submit',
        classMod: 'form__button_signin',
        events: {
          click: this.submitHandler.bind(this)
        }
      },
      inputs: [
        {
          ref: 'email',
          type: 'email',
          name: 'email',
          text: 'Почта',
          id: 'form__email',
          errorMessage: 'Почта указана неверно',
          error: '',
          required: true,
          events: {
            focusout: this.inputBlurHandler.bind(this),
          }
        },
        {
          ref: 'login',
          type: 'text',
          name: 'login',
          text: 'Логин',
          id: 'form__login',
          errorMessage: 'Неправильный логин',
          error: '',
          required: true,
          events: {
            focusout: this.inputBlurHandler.bind(this),
          }
        },

        {
          ref: 'first_name',
          type: 'text',
          name: 'first_name',
          id: 'form__first-name',
          text: 'Имя',
          errorMessage: 'Имя указано неверно',
          error: '',
          required: true,
          events: {
            focusout: this.inputBlurHandler.bind(this),
          }
        },
        {
          ref: 'second_name',
          type: 'text',
          name: 'second_name',
          id: 'form__second-name',
          text: 'Фамилия',
          errorMessage: 'Фамилия указана неверно',
          error: '',
          required: true,
          events: {
            focusout: this.inputBlurHandler.bind(this),
          }
        },
        {
          ref: 'phone',
          type: 'tel',
          name: 'phone',
          id: 'form__phone',
          text: 'Телефон',
          errorMessage: 'Телефон указан неверно',
          error: '',
          required: true,
          events: {
            focusout: this.inputBlurHandler.bind(this),
          }
        },
        {
          ref: 'password',
          type: 'password',
          text: 'Пароль',
          id: 'form__password',
          name: 'password',
          errorMessage: 'Пароль указан неверно',
          error: '',
          required: true,
          events: {
            focusout: this.inputBlurHandler.bind(this),
          }
        },
        {
          ref: 're_password',
          type: 'password',
          text: 'Пароль (ещё раз)',
          id: 'form__password-repeat',
          name: 're_password',
          errorMessage: 'Пароли не совпадают',
          error: '',
          required: true,
          events: {
            focusout: this.inputBlurHandler.bind(this),
          }
        },
      ],
    }
  }
  render () {
    return `<div class="flex fuul-height">
              <div class="centered">
              <form class='form form_sigin'>
                <h1 class="form__header">Регистрация</h1>
                <div class='form__list'>
                  {{#each inputs}}
                    {{{Input name=this.name
                            text=this.text
                            id=this.id
                            type=this.type
                            error=this.error
                            errorMessage=this.errorMessage
                            value=this.value
                            events=this.events
                            ref=this.ref
                      }}}
                  {{/each}}
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
                    <a href="login" class="form__link">Войти</a>
                  </div>
                </div>
              </form>
              </div>
            </div>`
  }
}