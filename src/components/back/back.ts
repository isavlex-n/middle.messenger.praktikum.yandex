import Block from '../../core/Block'
import './back.scss'
export class Back extends Block {
  render () {
    return `
    <div class="back">
      <div class="back__button">
        {{{Button classMod="button_back"}}}
      </div>
    </div>
    `
  }
}