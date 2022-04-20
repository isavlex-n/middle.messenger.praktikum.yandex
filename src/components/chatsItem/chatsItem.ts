import Block from '../../core/Block'
import './chatsItem.scss'

export class ChatsItem extends Block {
  static nameOfComponent = 'ChatsItem'

  constructor(props) {
    super(props)
  }

  render() {
    return `
    <div class="chats__item">
      <div class="chats__plug" data-id={{id}}></div>
      <div class="chats__img-wrap">
        <img class="chats__img" src="{{src}}"  />
      </div>
      <div class="chats__description">
        <h3 class="chats__item-name">{{title}}</h3>
        <p class="chats__item-text">{{text}}</p>
        <div class="chats__unread-count">{{unCount}}</div>
      </div>
    </div>
    `
  }
}
