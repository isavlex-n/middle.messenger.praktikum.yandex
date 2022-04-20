import { Router } from '../core'
import ChatsAPI, { ChatsRequestData } from '../api/chatsAPI'
import store from '../core/Store'

const router = new Router('.app')
const chatsApi = new ChatsAPI()

export default class ChatsService {
  public async getChats() {
    const chats = chatsApi.request()
    chats.then((data) => data)
  }
}
