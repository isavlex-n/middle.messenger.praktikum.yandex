import signupTemplate from './signup.hbs'
import {data} from './data'
import './signup.scss'

function getLoginPage() {
  const htmlChunk = signupTemplate({data})
  return htmlChunk
}

export default getLoginPage