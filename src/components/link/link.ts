import Block from '../../core/Block'

import './link.scss'

interface LinkProps {
  text: string;
  link: string;
  classLink: string;
}

export class Link extends Block {
  static nameOfComponent = 'Link'

  constructor(props: LinkProps) {
    const onClick = (e: MouseEvent) => {
      // const router = new Router();
      // router.go(this.props.to);

      e.preventDefault()
    }

    super({...props, events: {click: onClick}})
  }

  render() {
    // language=hbs
    return `<a href="{{link}}" class="link {{classLink}}">{{textLink}}</a>`
  }
}
