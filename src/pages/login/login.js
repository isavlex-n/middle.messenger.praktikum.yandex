import loginTemplate from './login.hbs'
import {data} from './data'
import './login.scss'

function getLoginPage() {
  const htmlChunk = loginTemplate({data})
  return htmlChunk
}

export default getLoginPage
