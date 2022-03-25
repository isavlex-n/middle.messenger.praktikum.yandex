import * as Handlebars from 'handlebars'
import {chats} from './chats.hbs'
import {data} from './data'
import './chats.scss'

function getChatsPage() {
  const chatsTemplate = Handlebars.compile(chats)
  const htmlChunk = chatsTemplate(data)
  return htmlChunk
}

export default getChatsPage
