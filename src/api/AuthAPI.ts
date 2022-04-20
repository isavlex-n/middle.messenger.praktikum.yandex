import HTTPTransport from '../core/HTTPTransport'

export type LoginData = {
  login: string
  password: string
}

export type SignupData = {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
}

const auth = new HTTPTransport('auth')

export default class AuthAPI {
  login(user: LoginData) {
    return auth.post('signin', {
      includeCredentials: true,
      headers: { 'Content-Type': 'application/json' },
      data: user,
    })
  }

  logout() {
    return auth.post('logout', {
      includeCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  getUser() {
    return auth.get('user', {
      includeCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    })
  }

  signUp(user: SignupData) {
    return auth.post('signup', {
      includeCredentials: true,
      headers: { 'Content-Type': 'application/json' },
      data: user,
    })
  }
}
