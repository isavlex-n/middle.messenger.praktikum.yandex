import { profileTemplate } from './profile.hbs'
import Block from '../../core/Block'
import validateInputHandler, { isValid } from '../../utils/validateInputHandler'
import AuthService from '../../services/auth'
import UsersService from '../../services/users'
import { Router } from '../../core'
import { connect } from '../../utils/connect'
import store from '../../core/Store'
import './profile.scss'

const authService = new AuthService()
const userService = new UsersService()
const router = new Router('app')
class Profile extends Block {
  componentDidMount() {
    this.getUser()
  }

  async getUser() {
    const user: Indexed = await authService.getUser()
    const { fields } = this.state
    const newFields = fields.map((field: Indexed) => {
      const newValue = user[field.name]
      const newField = { ...field, value: newValue }
      return newField
    })
    this.setState({
      ...this.state,
      fields: newFields,
      user,
    })
  }

  toggleDataHandler() {
    const links = document.querySelector('.profile__links')
    const button = document.querySelector('.profile__button')
    links?.classList.toggle('profile__links_hidden')
    button?.classList.toggle('profile__button_hidden')
  }

  changeDataHandler(event: Event) {
    event.preventDefault()
    const { fields } = this.state
    const newFields = fields.map((field: TStringObject) => ({
      ...field,
      readonly: false,
    }))
    this.setState({
      ...this.state,
      fields: newFields,
    })

    this.toggleDataHandler()
  }

  changePassHandler(event: Event) {
    event.preventDefault()
    this.changeDataHandler(event)
    const profileData = document.querySelector('.profile__change-data')
    const profilePass = document.querySelector('.profile__change-pass')
    profileData?.classList.toggle('profile__change-data_hidden')
    profilePass?.classList.toggle('profile__change-pass_hidden')
  }

  saveDataHandler(event: Event) {
    event.preventDefault()
    const profileData = document.querySelector('.profile__change-data')
    const condition = profileData?.classList.contains(
      'profile__change-data_hidden'
    )
    if (!condition) {
      const login = this.refs.login.querySelector('input')!.value
      const email = this.refs.email.querySelector('input')!.value
      const first_name = this.refs.first_name.querySelector('input')!.value
      const second_name = this.refs.second_name.querySelector('input')!.value
      const phone = this.refs.phone.querySelector('input')!.value
      const loginData = {
        login,
        email,
        first_name,
        second_name,
        phone,
      }
      Object.entries(loginData).forEach(([key, value]) => {
        this.setChildProps(`${key}Error`, {
          error: validateInputHandler(key, value),
        })
      })
      if (isValid(loginData)) {
        userService.changeUserProfile({
          ...loginData,
          display_name: loginData.first_name,
        })
        setTimeout(() => {
          this.getUser()
        }, 2000)
      }
    } else {
      const old_password = this.refs.old_password.querySelector('input')!.value
      const password = this.refs.password.querySelector('input')!.value
      const re_password = this.refs.re_password.querySelector('input')!.value
      const passData = {
        old_password,
        password,
        re_password,
      }
      Object.entries(passData).forEach(([key, value]) => {
        this.setChildProps(`${key}Error`, {
          error: validateInputHandler(key, value),
        })
      })
      if (isValid(passData)) {
        userService.changeUserPassword({
          oldPassword: passData.old_password,
          newPassword: passData.password,
        })
        setTimeout(() => {
          this.getUser()
        }, 2000)
      }
    }
  }

  fieldFocusHandler(event: Event) {
    const target = event.target as HTMLInputElement
    this.setChildProps(`${target.name}Error`, { error: '' })
  }

  fieldBlurHandler(event: Event) {
    const target = event.target as HTMLInputElement
    this.setChildProps(`${target.name}Error`, {
      error: validateInputHandler(target.name, target.value),
    })
  }

  logoutHandler(event: Event) {
    event.preventDefault()
    authService.logout()
    router.go('/signin')
  }

  changeFileHandler(event: Event) {
    const { files }: { files: FileList | null } =
      event.target as HTMLInputElement
    if (!files?.length) {
      return
    }
    const [file] = files
    const formData = new FormData()
    formData.append('avatar', file)
    userService.changeUserAvatar(formData).then((data) => {
      store.set({
        user: data,
      })
    })
  }

  protected getStateFromProps() {
    this.state = {
      choose: {
        change: this.changeFileHandler.bind(this),
      },
      userName: 'Иван',
      fields: [
        {
          ref: 'email',
          refError: 'emailError',
          id: 'field__email',
          label: 'Почта',
          name: 'email',
          type: 'email',
          value: '',
          readonly: true,
          events: {
            focusin: this.fieldFocusHandler.bind(this),
            focusout: this.fieldBlurHandler.bind(this),
          },
        },
        {
          ref: 'login',
          refError: 'loginError',
          id: 'field__login',
          label: 'Логин',
          name: 'login',
          type: 'text',
          value: 'login',
          readonly: true,
          events: {
            focusin: this.fieldFocusHandler.bind(this),
            focusout: this.fieldBlurHandler.bind(this),
          },
        },
        {
          ref: 'first_name',
          refError: 'first_nameError',
          id: 'field__first-name',
          label: 'Имя',
          name: 'first_name',
          type: 'text',
          value: 'Иван',
          readonly: true,
          events: {
            focusin: this.fieldFocusHandler.bind(this),
            focusout: this.fieldBlurHandler.bind(this),
          },
        },
        {
          ref: 'second_name',
          refError: 'second_nameError',
          id: 'field__second-name',
          label: 'Фамилия',
          name: 'second_name',
          type: 'text',
          value: 'Иванов',
          readonly: true,
          events: {
            focusin: this.fieldFocusHandler.bind(this),
            focusout: this.fieldBlurHandler.bind(this),
          },
        },
        {
          ref: 'phone',
          refError: 'phoneError',
          id: 'field__phone',
          label: 'Телефон',
          name: 'phone',
          type: 'tel',
          value: '+7 (909) 999 99 99',
          readonly: true,
          events: {
            focusin: this.fieldFocusHandler.bind(this),
            focusout: this.fieldBlurHandler.bind(this),
          },
        },
      ],
      passwords: [
        {
          ref: 'old_password',
          refError: 'old_passwordError',
          id: 'field__old-pass',
          label: 'Старый пароль',
          name: 'old_password',
          value: '*****',
          type: 'password',
          events: {
            focusin: this.fieldFocusHandler.bind(this),
            focusout: this.fieldBlurHandler.bind(this),
          },
        },
        {
          ref: 'password',
          refError: 'passwordError',
          id: 'field__new-pass',
          label: 'Новый пароль',
          name: 'password',
          value: '*****',
          type: 'password',
          events: {
            focusin: this.fieldFocusHandler.bind(this),
            focusout: this.fieldBlurHandler.bind(this),
          },
        },
        {
          ref: 're_password',
          refError: 're_passwordError',
          id: 'field__re-pass',
          label: 'Подтвердите новый пароль',
          name: 're_password',
          value: '*****',
          type: 'password',
          events: {
            focusin: this.fieldFocusHandler.bind(this),
            focusout: this.fieldBlurHandler.bind(this),
          },
        },
      ],
      button: {
        text: 'Сохранить',
        events: {
          click: this.saveDataHandler.bind(this),
        },
      },
      links: [
        {
          link: '#',
          textLink: 'Изменить данные',
          events: {
            click: this.changeDataHandler.bind(this),
          },
        },
        {
          link: '#',
          textLink: 'Изменить пароль',
          events: {
            click: this.changePassHandler.bind(this),
          },
        },
        {
          link: '#',
          textLink: 'Выйти',
          classLink: 'link_red',
          events: {
            click: this.logoutHandler.bind(this),
          },
        },
      ],
    }
  }

  render() {
    return profileTemplate
  }
}

const withProfile = connect((state) => ({
  error: state.error,
  user: state.user,
  isLoading: state.isLoading,
}))
export default withProfile(Profile)
