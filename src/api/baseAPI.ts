/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
export default class BaseAPI {
  // На случай, если забудете переопределить метод и используете его, — выстрелит ошибка
  create(data: Indexed) {
    throw new Error('Not implemented')
  }

  request(data: Indexed) {
    throw new Error('Not implemented')
  }

  update() {
    throw new Error('Not implemented')
  }

  delete() {
    throw new Error('Not implemented')
  }
}
