import Block from '../../core/Block'
import { chatsTemplate } from './chats.hbs'
import './chats.scss'

export class Chats extends Block {
  messageButtonHandler(event: Event) {
    event.preventDefault()
    const message = document.querySelector(
      '.chats__input_message'
    )! as HTMLInputElement

    if (!message.value) {
      message.classList.add('chats__input_error')
      setTimeout(() => {
        message.classList.remove('chats__input_error')
      }, 1000)
    }
  }
  protected getStateFromProps() {
    this.state = {
      button: {
        classMod: 'button_forward',
        type: 'submit',
        events: {
          click: this.messageButtonHandler.bind(this),
        },
      },
      message: {
        type: 'text',
      },
      items: [
        { name: 'Андрей', text: 'Изображение', srcImg: '' },
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
