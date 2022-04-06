import Block from '../../core/Block'
import './field.scss'

export class Field extends Block {
  static nameOfComponent = 'Field'
  render () {
    return `
    <div class='field'>
      <label for='{{id}}' class='field__label'>{{name}}</label>
      <input
        id='{{id}}'
        type='{{type}}'
        class='field__input'
        readonly='{{readonly}}'
        value='{{value}}'
      />
    </div>
  `
  }
}