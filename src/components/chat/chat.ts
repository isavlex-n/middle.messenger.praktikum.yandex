import Block from '../../core/Block'
import { template } from './chat.hbs'
import './chat.scss'

export class Chat extends Block {
  static nameOfComponent = 'Chat'

  protected render(): string {
    return template
  }
}
