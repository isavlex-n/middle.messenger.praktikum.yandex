import * as Handlebars from 'handlebars'
import {login} from './login.hbs'
import {data} from './data'
import './login.scss'

function getLoginPage() {
  const loginTemplate = Handlebars.compile(login)
  const htmlChunk = loginTemplate({data})
  return htmlChunk
}

export default getLoginPage
