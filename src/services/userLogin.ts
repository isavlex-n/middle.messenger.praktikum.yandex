import { Router } from '../core'
import LoginAPI, { LoginRequestData } from '../api/loginAPI'
import store from '../core/Store'
import { isValid } from '../utils/validateInputHandler'

const router = new Router('.app')
const loginApi = new LoginAPI()

export default class UserLoginService {
  public async login(data: LoginRequestData) {
    try {
      // Запускаем крутилку

      if (!isValid(data)) {
        throw new Error('Data is not valid')
      }

      // if (store.getState().user) {
      //   router.go('/chats')
      // }

      const loginRequest = loginApi.request(data)
      loginRequest
        .then((res) => {
          console.log(res)
        })
        .then((res) => {
          const userRequest = loginApi.getUserData()
          userRequest.then((res) => {
            console.log(res)
          })
        })
        .catch((err) => {
          console.log(err.reason)
          store.set('error', err.reason)
          setTimeout(() => {
            store.set('error', '')
          }, 2000)
        })
      // const userRequest = loginApi.getUserData()
      // userRequest.then((res) => {
      //   console.log(res)
      // })
      // store.set('user', user)
      // router.go('/chats')

      // Останавливаем крутилку
    } catch (error) {
      // console.log(error)
    }
  }
}
