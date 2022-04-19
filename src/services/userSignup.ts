import { Router } from '../core'
import SignupAPI, { SignupRequestData } from '../api/signupAPI'
import store from '../core/Store'
import { isValid } from '../utils/validateInputHandler'

const router = new Router('.app')
const signupApi = new SignupAPI()

export default class UserLoginService {
  public async signup(data: SignupRequestData) {
    try {
      // Запускаем крутилку

      if (!isValid(data)) {
        throw new Error('Data is not valid')
      }

      const request = signupApi.request(data)
      request.then((res) => {
        console.log('success')
        store.set('user', res)
        router.go('/signin')
      }).catch((err) => {
        console.log('error')
        store.set('error', err.reason)
        setTimeout(() => {
          store.set('error', '')
        }, 1500)
      })

      // Останавливаем крутилку
    } catch (error) {
      console.log(error)
    }
  }
}
