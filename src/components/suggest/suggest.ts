import Block from '../../core/Block'
import './suggest.scss'

export class Suggest extends Block {
  static nameOfComponent = 'Suggest'

  protected render(): string {
    // language=hbs
    return `
      <div class="suggest">
        <ul class="suggest__list">
          {{#each items}}
          <li class="suggest__item" data-type="suggest" id="{{this.id}}">{{this.login}}</li>
          {{/each}}
        </ul>
      </div>
    `
  }
}
