import Block from '../../core/Block'
import { errorsTemplate } from './errors.hbs'

class Error500 extends Block {
  protected getStateFromProps() {
    this.state = {
      number: 500,
      text: 'Мы уже фиксим',
    }
  }
  render() {
    return errorsTemplate
  }
}

class Error404 extends Block {
  protected getStateFromProps() {
    this.state = {
      number: 404,
      text: 'Не туда попали',
    }
  }
  render() {
    return errorsTemplate
  }
}

export { Error404, Error500 }
