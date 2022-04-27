import './index.scss'
import { Block, Router, registerComponent } from './core'
import AuthAPI from './api/AuthAPI'
import Login from './pages/login/login'
import Signup from './pages/signup/signup'
import Errors from './pages/errors'
import Profile from './pages/profile/profile'
import Chats from './pages/chats/chats'
import store from './core/Store'

// eslint-disable-next-line global-require
const components = require('./components/**/index.ts') as {
  [key: string]: { default: typeof Block }
}

Object.values(components).forEach((component) => {
  registerComponent(component.default)
})

const router = new Router('.app')

async function getUser() {
  try {
    const auth = new AuthAPI()
    const user = await auth.getUser()
    store.set({
      user,
    })
  } catch (error) {
    router.go('/signin')
  }
}

document.addEventListener('DOMContentLoaded', () => {
  router
    .use('/', Chats, {})
    .use('/messenger', Chats, {})
    .use('/signin', Login, {})
    .use('/signup', Signup, {})
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
  getUser()
})
