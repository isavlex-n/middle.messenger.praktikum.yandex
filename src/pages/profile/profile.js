import * as Handlebars from 'handlebars'
import {profile} from './profile.hbs'
import {data} from './data'
import './profile.scss'

function getProfilePage() {
  const profileTemplate = Handlebars.compile(profile)
  const htmlChunk = profileTemplate({...data})
  return htmlChunk
}

export default getProfilePage
