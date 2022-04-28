import './index.scss'
import { Block, Router, registerComponent } from './core'
import AuthService from './services/auth'
import Login from './pages/login/login'
import Signup from './pages/signup/signup'
import Errors from './pages/errors'
import Profile from './pages/profile/profile'
import Chats from './pages/chats/chats'

// eslint-disable-next-line global-require
const components = require('./components/**/index.ts') as {
  [key: string]: { default: typeof Block }
}

Object.values(components).forEach((component) => {
  registerComponent(component.default)
})

const authService = new AuthService()
const router = new Router('.app')

document.addEventListener('DOMContentLoaded', () => {
  router
    .setUnprotectedPaths(['/', '/sign-up', '/error-500'])
    .onRoute(authService.getUser)
    .use('/', Login, {})
    .use('/messenger', Chats, {})
    .use('/sign-up', Signup, {})
    .use('/settings', Profile, {})
    .use('/error-500', Errors, {
      number: '500',
      text: 'Уже фиксим',
    })
    .use('*', Errors, {
      number: '400',
      text: 'Не туда попали',
    })
    .start()
})
