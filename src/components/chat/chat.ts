import Block from '../../core/Block'
import { template } from './chat.hbs'
import './chat.scss'

export class Chat extends Block {
  static nameOfComponent = 'Chat'

  scrolToBottom() {
    const scroll = document.querySelector('.hidden-for-scroll')
    if (scroll) {
      scroll.scrollIntoView({ block: 'end', behavior: 'auto' })
    }
  }

  inputHandler() {
    this.scrolToBottom()
  }

  protected getStateFromProps() {
    this.state = {
      inputEvents: {
        focusin: this.inputHandler.bind(this),
      },
    }
  }

  protected render(): string {
    return template
  }
}
