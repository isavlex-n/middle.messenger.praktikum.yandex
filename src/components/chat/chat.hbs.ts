// language=hbs
export const template = `
<section class="chat">
  {{#if currentChat}}
  <header class="chat__header">
    <div class="chat__person">
      <div class="chat__person-wrap">
        <img src="{{chatImg}}" class="chat__person-img" />
      </div>
      <h3 class="chat__person-name">
        {{#each personNames}}
        <span>{{this.first_name}}&nbsp;</span>
        {{/each}}
      </h3>
    </div>
    {{{UserMenu events=userMenuEvents}}}
  </header>

    {{{Messages messages=messages onTop=onTop}}}
    <form class="chat__form" id="chat__form">
      <footer class="chat__footer">
        <div class="chat__attach">
          <div class="chat__attach-list chat__attach-list_hidden ">
            <div class="chat__attach-item">
              <p class="chat__attach-text chat__attach-photo">Фото или Видео</p>
            </div>
            <div class="chat__attach-item">
              <p class="chat__attach-text chat__attach-file">Файл</p>
            </div>
            <div class="chat__attach-item">
              <p class="chat__attach-text chat__attach-location">Локация</p>
            </div>
          </div>
        </div>
        <div class="chat__writing">
          {{{Input
            ref="messageInput"
            type="text"
            name="message"
            placeholder="Введите сообщение"
            classMod="chat__input chat__input_message"
            mode="chat__input-message"
            }}}
        </div>
        <div class="chat__send-button">
          {{{Button classMod=buttonClassMod type=buttonType events=buttonEvents}}}
        </div>
      </footer>
    </form>
    {{else}}
    <p class="centered">Выберите чат</p>
    {{/if}}
  </section>
`
