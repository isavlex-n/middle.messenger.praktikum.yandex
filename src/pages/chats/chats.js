import chatsTemplate from './chats.hbs'
import {data} from './data'
import './chats.scss'

function getChatsPage() {
  const htmlChunk = chatsTemplate(data)
  return htmlChunk
}

export default getChatsPage
