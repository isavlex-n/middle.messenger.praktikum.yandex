import Block from '../../core/Block'
import './button.scss'

interface ButtonProps {
  text: string
  classMod: string
  onClick: () => void
}

export class Button extends Block {
  static nameOfComponent = 'Button'
  constructor({text, classMod, onClick}: ButtonProps) {
    super({text, classMod, events: {click: onClick}})
  }

  protected render(): string {
    // language=hbs
    return `
      <button class="button {{classMod}}" type="button">{{text}}</button>
    `
  }
}
