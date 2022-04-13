import Block from '../../core/Block'

export class Errors extends Block {
  render() {
    return `
    <div class="flex fuul-height">
      <div class="centered center">
        <h1>{{number}}</h1>
        <p>{{text}}</p>
        {{{Link textLink='Назад к чатам' link='/chat'}}}
      </div>
    </div>
    `
  }
}
