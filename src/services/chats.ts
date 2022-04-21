import { Router } from '../core'
import ChatsAPI, { ChatsRequestData } from '../api/chatsAPI'
import store from '../core/Store'

const router = new Router('.app')
const chatsApi = new ChatsAPI()

export default class ChatsService {
  public async getChats() {
    store.set('isLoading', true)
    const chats = await chatsApi.request()
    store.set('isLoading', false)
    return chats
  }
}
