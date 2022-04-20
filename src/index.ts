import './index.scss'
import { Block, Router, registerComponent } from './core'
import AuthAPI from './api/AuthAPI'
import Login from './pages/login/login'
import Signup from './pages/signup/signup'
import Errors from './pages/errors'
import Profile from './pages/profile'
import Chats from './pages/chats/chats'
import store from './core/Store'

// eslint-disable-next-line global-require
const components = require('./components/**/index.ts') as {
  [key: string]: { default: typeof Block }
}

Object.values(components).forEach((component) => {
  registerComponent(component.default)
})

async function getUser(router) {
  try {
    const auth = new AuthAPI()
    const user = await auth.getUser()
    store.set('user', user.login)
  } catch (error) {
    router.go('/signin')
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const router = new Router('.app')
  router
    .use('/', Chats, {})
    .use('/messenger', Chats, {})
    .use('/signin', Login, {})
    .use('/signup', Signup, {})
    .use('/settings', Profile, {})
    .use('/error-400', Errors, {
      number: '400',
      text: 'Не туда попали',
    })
    .use('/error-500', Errors, {
      number: '500',
      text: 'Уже фиксим',
    })
    .start()
  getUser(router)
})
