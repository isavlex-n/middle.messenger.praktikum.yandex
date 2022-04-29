/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-multiple-empty-lines */
import 'global-jsdom/register'
import { expect } from 'chai'
import Router from './Router'
import Block from './Block'

describe('Router', () => {
  class PageOne extends Block {}
  class PageTwo extends Block {}
  class PageThree extends Block {}
  let router: Router
  let counter: number = 0
  beforeEach(() => {
    router = new Router('.app')
    router
      .setUnprotectedPaths(['/two'])
      .onRoute(() => {
        counter += 1
      })
      .use('/', PageOne, {})
      .use('/one', PageTwo, {})
      .use('/two', PageThree, {})
      .start()
  })

  it('Router history length should change', () => {
    router.go('/')
    router.go('/two')
    expect(router.history.length).to.eq(3)
  })

  it('Path should change to "/one"', () => {
    router.go('/one')
    const path = router.currentRoute?.pathname || {}

    expect(path).to.eq('/one')
  })

  it('Counter should to equal 3', () => {
    expect(counter).to.eq(3)
  })
})
