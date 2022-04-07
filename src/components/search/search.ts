import Block from '../../core/Block'
import './search.scss'

export class Search extends Block {
  static nameOfComponent = 'Search'

  render() {
    return `
    <div class="search">
      <input class="search__input" placeholder="Поиск" type="search"/>
      {{{Button classMod="search__button"}}}
    </div>
  `
  }
}
