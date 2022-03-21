import './components'
// import './layout'
import './index.scss'
import getSignupPage from './pages/signup/'
import getLoginPage from './pages/login/'
import getProfilePage from './pages/profile/'
import getErrorPage from './pages/error'
import getChatsPage from './pages/chats'

document.addEventListener('DOMContentLoaded', () => {
  let getPage
  switch (window.location.pathname) {
    case '/':
      getPage = getLoginPage
      break
    case '/login':
      getPage = getLoginPage
      break
    case '/chats':
      getPage = getChatsPage
      break
    case '/profile':
      getPage = getProfilePage
      break
    case '/signup':
      getPage = getSignupPage
      break
    default:
      getPage = getErrorPage
      break
  }
  const app = document.querySelector('.app')
  app.insertAdjacentHTML('beforeend', getPage())
})
