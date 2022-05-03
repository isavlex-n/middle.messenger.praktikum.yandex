import Block from '../../core/Block'
import './chatsItem.scss'

export class ChatsItem extends Block {
  static nameOfComponent = 'ChatsItem'

  render() {
    return `
    <div class="chats-item {{#if active}}chats-item_active{{/if}}">
      <div class="chats-item__plug" data-id={{id}}></div>
      <div class="chats-item__img-wrap">
        <img class="chats-item__img" src="{{src}}"  />
      </div>
      <div class="chats-item__description">
        <h3 class="chats-item__name">{{title}}</h3>
        <p class="chats-item__text">{{text}}</p>
        <div class="chats-item__unread-count">{{unCount}}</div>
      </div>
    </div>
    `
  }
}
