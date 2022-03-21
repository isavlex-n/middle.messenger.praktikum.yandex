import profileTemplate from './profile.hbs'
import {data} from './data'
import './profile.scss'

function getProfilePage() {
  const htmlChunk = profileTemplate({...data})
  return htmlChunk
}

export default getProfilePage
