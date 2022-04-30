import Block from '../../core/Block'
import Router from '../../core/Router'
import './link.scss'

interface LinkProps {
  text: string
  link: string
  classLink: string
  to: string
}

export class Link extends Block {
  static nameOfComponent = 'Link'

  constructor(props: LinkProps) {
    const to = props.to
      ? {
        events: {
          click: (e: MouseEvent) => {
            e.preventDefault()
            const router = new Router('.app')
            if (this.props.to === 'back') {
              router.back()
            }
            router.go(this.props.to)
          },
        },
      }
      : {}
    super({ ...props, ...to })
  }

  render() {
    // language=hbs
    return `<a href="{{link}}" class="link {{classLink}}">{{textLink}}</a>`
  }
}
