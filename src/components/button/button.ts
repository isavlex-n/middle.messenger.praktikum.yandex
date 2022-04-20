import Block from '../../core/Block'
import './button.scss'
import Router from '../../core/Router'

interface ButtonProps {
  text: string
  classMod: string
  type: string
  events: { [key: string]: () => {} }
  to?: string
}

export class Button extends Block {
  static nameOfComponent = 'Button'

  constructor(props: ButtonProps) {
    const to = props.to
      ? {
        events: {
          click: (e: MouseEvent) => {
            e.preventDefault()
            const router = new Router('.app')
            if (this.props.to === 'back') {
              router.back()
              return
            }
            router.go(this.props.to)
          },
        },
      }
      : {}
    super({ ...props, ...to })
  }

  protected render(): string {
    // language=hbs
    return `
      <button class="button {{classMod}}" type="{{type}}" >{{text}}</button>
    `
  }
}
