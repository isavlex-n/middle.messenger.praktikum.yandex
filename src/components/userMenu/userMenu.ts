import Block from '../../core/Block'
import './userMenu.scss'

export class UserMenu extends Block {
  static nameOfComponent = 'UserMenu'

  protected render(): string {
    // language=hbs
    return `
      <div class="user-menu" data-button="toogle">
        <div class="user-menu__functions user-menu__functions_hidden">
          <div class="user-menu__function">
            <p class="user-menu__function-text user-menu__function-text_add-user" data-button="add-user">
              Добавить пользователя
            </p>
          </div>
          <div class="user-menu__function">
            <p class="user-menu__function-text user-menu__function-text_del-user" data-button="remove-user">
              Удалить пользователя
            </p>
          </div>
          <div class="user-menu__function">
            <p class="user-menu__function-text user-menu__function-text_del-chat" data-button="remove-chat">
              Удалить чат
            </p>
          </div>
        </div>
      </div>
    `
  }
}
