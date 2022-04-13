import { Router } from '../../core'
import Block from '../../core/Block'
import './back.scss'

const router = new Router('.app')

export class Back extends Block {
  static nameOfComponent = 'Back'

  protected getStateFromProps() {
    this.state = {
      events: {
        click: (e: Event) => {
          e.preventDefault()
          router.back()
        },
      },
    }
  }

  render() {
    return `
    <div class="back">
      <div class="back__button">
        {{{Button classMod="button_back" events=events}}}
      </div>
    </div>
    `
  }
}
