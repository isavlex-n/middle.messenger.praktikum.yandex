export const chats = `<div class="chats">
  <section class="chats__chats-list">
    <div class="chats__link-wrap">
      {{>link textLink="Профиль >" classLink="chats__link" link="/profile"}}
    </div>
    <div class="chats__search">
      {{> search}}
    </div>
    {{#each items}}
    {{> chatsItem this}}
    {{/each}}
  </section>
  <section class="chats__chat">
    <header class="chats__chat-header">
      <div class="chats__person">
        <div class="chats__person-wrap">
          <img src="{{personImg}}" class="chats__person-img" />
        </div>
        <h3 class="chats__person-name">{{personName}}</h3>
      </div>
      <div class="chats__functions-button">
        <div class="chats__functions chats__functions_hidden">
          <div class="chats__function">
            <p class="chats__function-text chats__function-text_add-user">Добавить пользователя</p>
          </div>
          <div class="chats__function">
            <p class="chats__function-text chats__function-text_del-user">Удалить пользователя</p>
          </div>
          <div class="chats__function">
            <p class="chats__function-text chats__function-text_del-chat">Удалить чат</p>
          </div>
        </div>
      </div>
    </header>
    <section class="chats__messages">
      <div class="chats__date-wrap">
        <span class="chats__date">19 июня</span>
      </div>
      <div class="chats__companion chats__message">
        <p class="chats__message-text">
          Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.

Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.
        </p>
      </div>
      <div class="chats__yourself chats__message">
        <p class="chats__message-text">
          Круто!
        </p>
      </div>
    </section>
    <footer class="chats__footer">
      <div class="chats__attach">
        <div class="chats__attach-list chats__attach-list_hidden ">
          <div class="chats__attach-item">
            <p class="chats__attach-text chats__attach-photo">Фото или Видео</p>
          </div>
          <div class="chats__attach-item">
            <p class="chats__attach-text chats__attach-file">Файл</p>
          </div>
          <div class="chats__attach-item">
            <p class="chats__attach-text chats__attach-location">Локация</p>
          </div>
        </div>
      </div>
      <div class="chats__writing">
        <input type="text" class="chats__input" placeholder="Сообщение"/>
      </div>
      <div class="chats__send-button">
        {{> button classMod="button_forward"}}
      </div>
    </footer>
  </section>
</div>`