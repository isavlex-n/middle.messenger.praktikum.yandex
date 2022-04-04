import Block from '../../core/Block'


export class Login extends Block {


  submitHandler(event: Event) {
    event.preventDefault()
    const totals = this.state.data.totals
    if (totals.login && totals.password) {
      console.log(this.state.data.totals)
    }
  }

  inputFocusHandler(event: Event) {

    const target = event.target as HTMLInputElement
    // const indexOfInput = this.state.data.inputs.findIndex((input: TStringObject) => input.name === target.name)
    // const inputs = this.state.data.inputs
    // if (inputs[indexOfInput].error) {
    //   inputs[indexOfInput].error = ''
    //   this.setProps({
    //     data: {
    //       ...this.state.data,
    //       inputs,
    //     }
    //   })
    // }
  }

  inputBlurHandler(event: Event) {
    const target = event.target as HTMLInputElement
    const indexOfInput = this.state.data.inputs.findIndex((input: TStringObject) => input.name === target.name)
    const inputs = this.state.data.inputs
    if (!this.validateInputHandler(<HTMLInputElement>event.target)) {
      inputs[indexOfInput].error = inputs[indexOfInput].errorMessage
      inputs[indexOfInput].value = target.value
      this.setState({
        data: {
          ...this.state.data,
          totals: {
            ...this.state.data.totals,
            [target.name]: '',
          },
          inputs,
        }
      })
    } else {
      inputs[indexOfInput].error = ''
      inputs[indexOfInput].value = target.value
      this.setState({
        data: {
          ...this.state.data,
          totals: {
            ...this.state.data.totals,
            [target.name]: target.value,
          },
          inputs,
        }
      })
    }
  }


  protected getStateFromProps() {
    this.state = {
      data: {
        button: {
          text: 'Авторизоваться',
          type: 'submit',
          classMod: 'form__button_signin'
        },
        totals: {
          login: '',
          password: ''
        },
        mod: 'login',
        header: 'Вход',
        inputs: [
          {
            name: 'login',
            text: 'Логин',
            id: 'form__login',
            type: 'text',
            error: '',
            errorMessage: 'Неправильный логин',
            value: '',
            events: {
              focus: this.inputFocusHandler.bind(this),
              blur: this.inputBlurHandler.bind(this),
            }
          },
          {
            type: 'password',
            text: 'Пароль',
            id: 'form__password',
            name: 'password',
            error: '',
            value: '',
            errorMessage: 'Неправильный пароль',
            events: {
              blur: this.inputBlurHandler.bind(this),
            }
          },
        ],
        link: '/signup',
        textLink: 'Нет аккаунта?',
        events: {
          submit: this.submitHandler.bind(this)
        }
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
