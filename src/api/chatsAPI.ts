import HTTPTransport from '../core/HTTPTransport'

export type ChatsCreateData = {
  title: string
}

const chatsRequest = new HTTPTransport('chats')

export default class ChatsAPI {
  create(user: ChatsCreateData) {
    return chatsRequest.post('', {
      includeCredentials: true,
      headers: { 'Content-Type': 'application/json' },
      data: user,
    })
  }

  request() {
    return chatsRequest.get('', {
      includeCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
