import HTTPTransport from '../core/HTTPTransport'

const chatsRequest = new HTTPTransport('chats')

type AddChatData = {
  title: string
}

type UsersData = {
  users: number[]
  chatId: number
}

type RemoveChatData = {
  chatId: number | string
}

export default class ChatsAPI {
  getToken(chatID: string | number) {
    return chatsRequest.post(`token/${chatID}`, {
      includeCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  addChat(data: AddChatData) {
    return chatsRequest.post('', {
      includeCredentials: true,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(data),
    })
  }

  removeChat(data: RemoveChatData) {
    return chatsRequest.delete('', {
      includeCredentials: true,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(data),
    })
  }

  getChatsList() {
    return chatsRequest.get('', {
      includeCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  getUsers(id: string | number) {
    return chatsRequest.get(`${id}/users`, {
      includeCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  addUsers(data: UsersData) {
    return chatsRequest.put('users', {
      includeCredentials: true,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(data),
    })
  }

  removeUsers(data: UsersData) {
    return chatsRequest.delete('users', {
      includeCredentials: true,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(data),
    })
  }
}
