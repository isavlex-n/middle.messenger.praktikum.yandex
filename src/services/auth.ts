import { Router } from '../core'
import AuthAPI, { LoginData, SignupData } from '../api/AuthAPI'
import store from '../core/Store'
import { isValid } from '../utils/validateInputHandler'

const router = new Router('.app')
const auth = new AuthAPI()

export default class AuthService {
  public async login(data: LoginData) {
    try {
      store.set({ isLoading: true })
      if (!isValid(data)) {
        throw new Error('Data is not valid')
      }

      if (store.getState().user) {
        store.set({ isLoading: false })
        router.go('/messenger')
      }

      await auth.login(data)

      const user = await auth.getUser()
      store.set({ isLoading: false, user })
      router.go('/messenger')
    } catch (error: any) {
      store.set({ isLoading: false })
      if (error.reason === 'User already in system') {
        router.go('/messenger')
        return
      }
      store.set({ error: error.reason })
      setTimeout(() => {
        store.set({ error: '' })
      }, 2000)
    }
  }

  public async signup(data: SignupData) {
    if (!isValid(data)) {
      throw new Error('Data is not valid')
    }

    await auth.signUp(data)
  }

  public async logout() {
    store.set({ isLoading: true })
    await auth.logout()
    store.set({ isLoading: false, user: null })
  }

  public async getUser() {
    store.set({ isLoading: true })
    const user = await auth.getUser()
    store.set({ isLoading: false, user })
    return user
  }
}
