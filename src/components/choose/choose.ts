import Block from '../../core/Block'
import './choose.scss'

export class Choose extends Block {
  static nameOfComponent = 'Choose'

  render() {
    return `
    <div class="choose">
      <label for="choose__input" class="choose__label" />
      <input type="file" accept="image/*" id="choose__input" class="choose__input" />
    </div>
    `
  }
}
