// language=hbs
export const template = `
<section class="chats__chat">
  {{#if currentChat}}
  <header class="chats__chat-header">
    <div class="chats__person">
      <div class="chats__person-wrap">
        <img src="{{chatImg}}" class="chats__person-img" />
      </div>
      <h3 class="chats__person-name">
        {{#each personNames}}
        <span>{{this.first_name}}&nbsp;</span>
        {{/each}}
      </h3>
    </div>
    {{{UserMenu events=userMenuEvents}}}
  </header>
  <section class="chats__messages">
    {{!-- <div class="chats__date-wrap">
      <span class="chats__date">19 июня</span>
    </div> --}}
    {{#each messages}}
    <div class="{{#if this.self}}chats__yourself{{else}}chats__companion{{/if}} chats__message">
      <p class="chats__message-text">
        {{this.content}}
      </p>
    </div>
    {{/each}}
    </section>
    <form class="chats__form" id="chats__form">
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
          <input
          type="text"
          name="message"
          class="chats__input chats__input_message"
          placeholder="Введите сообщение"/>
        </div>
        <div class="chats__send-button">
          {{{Button classMod=buttonClassMod type=buttonType events=buttonEvents}}}
        </div>
      </footer>
    </form>
    {{else}}
    <p class="centered">Выберите чат</p>
    {{/if}}
  </section>
`
