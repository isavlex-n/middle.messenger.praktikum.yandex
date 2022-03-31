import Block from '../../core/Block'
import {chatsTemplate} from './chats.hbs'
import './chats.scss'

export class Chats extends Block {
  protected getStateFromProps() {
    this.state = {
      items: [
        {name: 'Андрей', text: 'Изображение', srcImg: ''},
        {
          name: 'Илья',
          text: 'Друзья, у меня для вас особенный выпуск новостей!...',
          srcImg: '',
        },
      ],
    }
  }
  render() {
    return chatsTemplate
  }
}
