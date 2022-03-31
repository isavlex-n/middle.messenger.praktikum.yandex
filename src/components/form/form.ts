import {form} from './form.hbs'
import './form.scss'
import Block from '../../core/Block'

export class Form extends Block {
  static nameOfComponent = 'Form'
  constructor(data:any) {
    super(data)
  }

  protected render(): string {
    // language=hbs
    return form
  }
}