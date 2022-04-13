/* eslint-disable no-constructor-return */
import Block from './Block'
import Route from './Route'

export default class Router {
  // eslint-disable-next-line no-use-before-define
  private static __instance: Router

  private _currentRoute: Route | null | undefined

  protected history: History = window.history

  protected routes: Route[] = []

  private readonly _rootQuery: string | undefined

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance
    }

    this.routes = []
    this.history = window.history
    this._currentRoute = null
    this._rootQuery = rootQuery

    Router.__instance = this
  }

  use(pathname: string, block: typeof Block, props: TStringObject) {
    const route = new Route(pathname, block, {
      ...props,
      rootQuery: this._rootQuery,
    })

    this.routes.push(route)

    return this
  }

  start() {
    window.onpopstate = (event) => {
      this._onRoute((event.currentTarget as Window).location.pathname)
    }

    this._onRoute(window.location.pathname)
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname)
    if (!route) {
      return
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave()
    }

    this._currentRoute = route
    route.render()
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname)
    this._onRoute(pathname)
  }

  back() {
    this.history.back()
  }

  forward() {
    this.history.forward()
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname))
  }
}

// Можно обновиться на /user и получить сразу пользователя
// router
//   .use('/', Chats)
//   .use('/users', Users)
//   .start();

// Через секунду контент изменится сам, достаточно дёрнуть переход
// setTimeout(() => {
//   router.go('/users')
// }, 1000)

// // А можно и назад
// setTimeout(() => {
//   router.back()
// }, 3000)

// // И снова вперёд
// setTimeout(() => {
//   router.forward()
// }, 5000)
