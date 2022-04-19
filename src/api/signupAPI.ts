import HTTPTransport from '../core/HTTPTransport'
import BaseAPI from './baseAPI'

export type SignupRequestData = {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
}

const signupRequest = new HTTPTransport('auth')

export default class SignupAPI extends BaseAPI {
  request(user: SignupRequestData) {
    return signupRequest.post('signup', {
      headers: { 'Content-Type': 'application/json' },
      data: user,
    })
  }
}
