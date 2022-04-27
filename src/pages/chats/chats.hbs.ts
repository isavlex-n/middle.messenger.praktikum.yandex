export const chatsTemplate = `
<div class="chats">
  {{{Modal
    ref=modal.ref
    events=modal.events
    show=modal.show
    title=modal.title
    buttonText=modal.button.text
    buttonEvents=modal.button.events
    inputText=modal.input.text
    currentChat=currentChat
  }}}
  {{{Loader show=isLoading}}}
  <section class="chats__chats-list">
    <div class="chats__link-wrap">
      {{{Link textLink="Добавить чат >" classLink="chats__link" events=addChatLinkEvent}}}
      {{{Link textLink="Профиль >" classLink="chats__link" link="/settings" to="/settings"}}}
    </div>
    <div class="chats__search">
      {{{Search}}}
    </div>
    {{#each items}}
    {{{ChatsItem
      active=this.active
      ref=this.ref 
      title=this.title
      id=this.id
      text=this.last_message.content
      src=this.avatar
      unCount=this.unread_count
      events=this.events
    }}}
    {{/each}}
  </section>
  {{{Chat
    currentChat=currentChat
    userMenuEvents=userMenuEvents
    personNames=users
    buttonClassMod=button.classMod
    buttonType=button.type
    buttonEvents=button.events
    messages=messages
  }}}
</div>`
