import { Router } from '../core'
import AuthAPI, { LoginData, SignupData } from '../api/AuthAPI'
import { APIError, UserDTO } from '../api/types'
import store from '../core/Store'
import { isValid } from '../utils/validateInputHandler'
import { transformUser } from '../utils/apiTransformers'

const router = new Router('.app')
const auth = new AuthAPI()

export default class AuthService {
  public async login(data: LoginData) {
    try {
      // Запускаем крутилку

      if (!isValid(data)) {
        throw new Error('Data is not valid')
      }

      if (store.getState().user) {
        router.go('/messenger')
      }

      const response = await auth.login(data)

      const responseUser = await auth.getUser()

      store.set('user', responseUser.login)

      router.go('/messenger')
      // Останавливаем крутилку
    } catch (error: any) {
      if (error.reason === 'User already in system') {
        router.go('/messenger')
        return
      }
      store.set('error', error.reason)
      setTimeout(() => {
        store.set('error', '')
      }, 2000)
    }
  }

  public async signup(data: SignupData) {
    if (!isValid(data)) {
      throw new Error('Data is not valid')
    }

    await auth.signUp(data)
  }
}
