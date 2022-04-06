import Block from '../../core/Block'
import {validateInputHandler} from '../../core/utils'

export class Login extends Block {


  submitHandler(event: Event) {
    event.preventDefault()

    const loginData = {
      login: this.refs.login.querySelector('input')!.value,
      password: this.refs.password.querySelector('input')!.value,

    }
    console.log(loginData)
  }

  inputBlurHandler(event: Event) {
    const target = event.target as HTMLInputElement
    const inputs = this.state.inputs
    const indexOfInput = this.state.inputs.findIndex((input: TStringObject) => input.name === target.name)
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
          text: 'Авторизоваться',
          type: 'submit',
          classMod: 'form__button_signin',
          events: {
            click: this.submitHandler.bind(this)
          }
        },
        inputs: [
          {
            ref: "login",
            name: 'login',
            text: 'Логин',
            id: 'form__login',
            type: 'text',
            error: '',
            errorMessage: 'Неправильный логин',
            value: '',
            events: {
              focusout: this.inputBlurHandler.bind(this),
            }
          },
          {
            ref: "password",
            type: 'password',
            text: 'Пароль',
            id: 'form__password',
            name: 'password',
            error: '',
            value: '',
            errorMessage: 'Неправильный пароль',
            events: {
              focusout: this.inputBlurHandler.bind(this),
            }
          },
        ],
        
      
    }
  }

  render() {
    return `<div class="flex fuul-height">
              <div class="centered">
              <form class='form form_login'>
                <h1 class="form__header">Вход</h1>
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
                    <a href="/signup" class="form__link">Нет аккаунта?</a>
                  </div>
                </div>
              </form>
              </div>
            </div>`
  }
}
