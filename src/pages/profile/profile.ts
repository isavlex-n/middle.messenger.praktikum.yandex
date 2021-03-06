import { profileTemplate } from './profile.hbs'
import Block from '../../core/Block'
import validateInputHandler, { isValid } from '../../utils/validateInputHandler'
import authService from '../../services/auth'
import userService from '../../services/users'
import { router } from '../../router'
import { connect } from '../../utils/connect'
import store from '../../core/Store'
import './profile.scss'

class Profile extends Block {
  async componentDidMount() {
    await this.getUser()
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

  async saveDataHandler(event: Event) {
    event.preventDefault()
    const profileData = document.querySelector('.profile__change-data')
    const condition = profileData?.classList.contains(
      'profile__change-data_hidden',
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
        await userService.changeUserProfile({
          ...loginData,
          display_name: loginData.first_name,
        })
        await this.getUser()
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
        await userService.changeUserPassword({
          oldPassword: passData.old_password,
          newPassword: passData.password,
        })

        await this.getUser()
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

  async logoutHandler(event: Event) {
    event.preventDefault()
    await authService.logout()
    router.go('/signin')
  }

  async changeFileHandler(event: Event) {
    const { files }: { files: FileList | null } = event.target as HTMLInputElement
    if (!files?.length) {
      return
    }
    const [file] = files
    const formData = new FormData()
    formData.append('avatar', file)
    await userService.changeUserAvatar(formData).then((data) => {
      store.set({
        user: data,
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  protected getStateFromProps() {
    this.state = {
      choose: {
        change: this.changeFileHandler.bind(this),
      },
      userName: '????????',
      fields: [
        {
          ref: 'email',
          refError: 'emailError',
          id: 'field__email',
          label: '??????????',
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
          label: '??????????',
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
          label: '??????',
          name: 'first_name',
          type: 'text',
          value: '????????',
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
          label: '??????????????',
          name: 'second_name',
          type: 'text',
          value: '????????????',
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
          label: '??????????????',
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
          label: '???????????? ????????????',
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
          label: '?????????? ????????????',
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
          label: '?????????????????????? ?????????? ????????????',
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
        text: '??????????????????',
        events: {
          click: this.saveDataHandler.bind(this),
        },
      },
      links: [
        {
          link: '#',
          textLink: '???????????????? ????????????',
          events: {
            click: this.changeDataHandler.bind(this),
          },
        },
        {
          link: '#',
          textLink: '???????????????? ????????????',
          events: {
            click: this.changePassHandler.bind(this),
          },
        },
        {
          link: '#',
          textLink: '??????????',
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
