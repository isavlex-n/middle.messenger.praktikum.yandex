/* eslint-disable no-this-before-super */
import Block from '../../core/Block'
import debounce from '../../utils/debounce'
import './messages.scss'

interface MessagesProps {
  messages: object[]
  onTop?: (length: number) => void
}

export class Messages extends Block {
  static nameOfComponent = 'Messages'

  debounceScrollHandler: (event: Event) => void

  constructor(props: MessagesProps) {
    super({
      ...props,
      onTop: props.onTop,
      events: {
        scroll: (event: Event) => this.debounceScrollHandler(event),
      },
    })
    this.debounceScrollHandler = debounce.call(this, this.scrollHandler, 500)
    this.scrollHandler = this.scrollHandler.bind(this)
  }

  scrollHandler(event: Event) {
    const target = event.target as HTMLElement
    const isEndList = target.scrollTop <= -(target.scrollHeight - target.offsetHeight)
    if (isEndList) {
      this.props.onTop(this.props.messages.length)
    }
  }

  protected render(): string {
    // language=hbs
    return `
    <section class="chats__messages">
      {{!-- <div class="chats__date-wrap">
        <span class="chats__date">19 июня</span>
      </div> --}}
      {{#each messages}}
      <div class="{{#if this.self}}chats__yourself{{else}}chats__companion{{/if}} chats__message">
        <p class="chats__name">{{this.name}}</p>
        <p class="chats__message-text">
          {{this.content}}
        </p>
      </div>
      {{/each}}
      <div class="hidden-for-scroll"></div>
    </section>
    `
  }
}
