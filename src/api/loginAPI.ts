import HTTPTransport from '../core/HTTPTransport'
import BaseAPI from './baseAPI'

export type LoginRequestData = {
  login: string
  password: string
}

const loginRequest = new HTTPTransport('auth')

export default class LoginAPI extends BaseAPI {
  request(user: LoginRequestData) {
    return loginRequest.post('signin', {
      headers: { 'Content-Type': 'application/json' },
      data: user,
    })
  }

  getUserData() {
    return loginRequest.get('user', {
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
