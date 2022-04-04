import {form} from './form.hbs'
import './form.scss'
import Block from '../../core/Block'

export class Form extends Block {
  static nameOfComponent = 'Form'
  constructor(props:any) {
    super(props)
  }

  protected render(): string {
    // language=hbs
    return form
  }
}