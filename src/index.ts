import './index.scss'
import { registerComponent } from './core'
import authService from './services/auth'
import Login from './pages/login/login'
import Signup from './pages/signup/signup'
import Errors from './pages/errors'
import Profile from './pages/profile/profile'
import Chats from './pages/chats/chats'
import { router } from './router'
import components from './components'

components.forEach((component) => {
  registerComponent(component)
})

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
