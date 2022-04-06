import Block from '../../core/Block'
import './field.scss'


interface FieldProps {
  label: string
  readonly: boolean
}
export class Field extends Block {
  static nameOfComponent = 'Field'

  constructor(props: FieldProps) {
    super(props)
  }

  render () {
    return `
    <div class='field'>
      <label for='{{id}}' class='field__label'>{{label}}</label>
      <input
        id='{{id}}'
        type='{{type}}'
        class='field__input'
        value='{{value}}'
        name='{{name}}'
        {{#if readonly}}readonly{{/if}}
      />
    </div>
  `
  }
}