import Block from '../../core/Block'
import './loader.scss'

interface LoaderProps {
  text: string
  classMod: string
  type: string
  events: { [key: string]: () => {} }
  to?: string
}

export class Loader extends Block {
  static nameOfComponent = 'Loader'

  constructor(props: LoaderProps) {
    super(props)
  }

  protected render(): string {
    // language=hbs
    return `
      <div class="lds-facebook {{#if show}}lds-facebook_show{{/if}}"><div></div><div></div><div></div></div>
    `
  }
}
