import Block from '../../core/Block'
import './chatsItem.scss'

export class ChatsItem extends Block {
  render () {
    return `
    <div class="chats__item">
      <div class="chats__img-wrap">
        <img class="chats__img" src="{{srcImg}}"  />
      </div>
      <div class="chats__description">
        <h3 class="chats__item-name">{{name}}</h3>
        <p class="chats__item-text">{{text}}</p>
      </div>
    </div>
    `
  }
}