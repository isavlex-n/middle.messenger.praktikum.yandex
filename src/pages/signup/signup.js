import * as Handlebars from 'handlebars'
import {signup} from './signup.hbs'
import {data} from './data'
import './signup.scss'

function getLoginPage() {
  const signupTemplate = Handlebars.compile(signup)
  const htmlChunk = signupTemplate({data})
  return htmlChunk
}

export default getLoginPage