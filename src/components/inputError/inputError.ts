import Block from '../../core/Block'

import './inputError.scss'

interface ErrorProps {
  error: string
  classMod: string
}

export class InputError extends Block {
  static nameOfComponent = 'InputError'

  constructor(props: ErrorProps) {
    super(props)
  }

  protected render(): string {
    // language=hbs
    return `<div class="input-error {{classMod}}" >{{#if error}}{{error}}{{/if}}</div>`
  }
}
