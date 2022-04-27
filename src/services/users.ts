/* eslint-disable consistent-return */
import UsersAPI, { UserProfile, UserPassword } from '../api/usersAPI'
import store from '../core/Store'

const usersApi = new UsersAPI()

export default class UsersService {
  public async searchUserByLogin(login: string) {
    const searchResult = await usersApi.searchUserByLogin({ login })
    return searchResult
  }

  public async changeUserProfile(data: UserProfile) {
    try {
      store.set({ isLoading: true })
      const response = await usersApi.changeUserProfile(data)
      store.set({ isLoading: false })
      return response
    } catch (error) {
      store.set({ isLoading: false })
      console.log(error)
    }
  }

  public async changeUserPassword(data: UserPassword) {
    try {
      store.set({ isLoading: true })
      const response = await usersApi.changeUserPassword(data)
      store.set({ isLoading: false })
      return response
    } catch (error) {
      store.set({ isLoading: false })
      console.log(error)
    }
  }

  public async changeUserAvatar(data: FormData) {
    try {
      store.set({ isLoading: true })
      const response = await usersApi.changeUserAvatar(data)
      store.set({ isLoading: false })
      return response
    } catch (error) {
      store.set({ isLoading: false })
      console.log(error)
    }
  }
}
