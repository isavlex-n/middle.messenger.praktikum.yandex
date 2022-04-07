import Block from '../../core/Block'
import './button.scss'

interface ButtonProps {
  text: string
  classMod: string
  type: string
  events: { [key: string]: () => {} }
}

export class Button extends Block {
  static nameOfComponent = 'Button'

  constructor(props: ButtonProps) {
    super(props)
  }

  protected render(): string {
    // language=hbs
    return `
      <button class="button {{classMod}}" type="{{type}}">{{text}}</button>
    `
  }
}
