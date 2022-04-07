/* eslint-disable no-unused-vars */
import './index.scss'
import { Block, renderPage, registerComponent } from './core'

import Login from './pages/login'
import Signup from './pages/signup'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Error500, Error404 } from './pages/errors/errors'
import Profile from './pages/profile'
import Chats from './pages/chats'

// eslint-disable-next-line global-require
const components = require('./components/**/index.ts') as {
  [key: string]: { default: typeof Block }
}

Object.values(components).forEach((component) => {
  registerComponent(component.default)
})
document.addEventListener('DOMContentLoaded', () => {
  let getPage
  switch (window.location.pathname) {
    case '/':
      getPage = Login
      break
    case '/login':
      getPage = Login
      break
    case '/chats':
      getPage = Chats
      break
    case '/profile':
      getPage = Profile
      break
    case '/signup':
      getPage = Signup
      break
    default:
      getPage = Error404
      break
  }
  renderPage(getPage)
})
