import errorTemplate from './error.hbs'
import './error.scss'

function getErrorPage() {
  const data = {
    'error500': {number: '500', text: 'Мы уже фиксим'},
    'error404': {number: '404', text: 'Не туда попали'},
  }
  const htmlChunk = errorTemplate(data.error404)
  return htmlChunk
}

export default getErrorPage