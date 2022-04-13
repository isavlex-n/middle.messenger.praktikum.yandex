import './index.scss'
import { Block, Router, registerComponent } from './core'

import Login from './pages/login'
import Signup from './pages/signup'
import Errors from './pages/errors'
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
  const router = new Router('.app')
  router
    .use('/', Chats, {})
    .use('/chats', Chats, {})
    .use('/login', Login, {})
    .use('/signup', Signup, {})
    .use('/profile', Profile, {})
    .use('/error-400', Errors, {
      number: '400',
      text: 'Не туда попали',
    })
    .use('/error-500', Errors, {
      number: '500',
      text: 'Уже фиксим',
    })
    .start()
})
