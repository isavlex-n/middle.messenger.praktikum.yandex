import Block from '../../core/Block'
import { chatsTemplate } from './chats.hbs'
import './chats.scss'
import { connect } from '../../utils/connect'
import ChatsService from '../../services/chats'
import socketService from '../../services/socket'
import store from '../../core/Store'

const service = new ChatsService()

class Chats extends Block {
  componentDidMount() {
    this.getChats()
  }

  scrolToBottom() {
    const scroll = document.querySelector('.hidden-for-scroll')
    if (scroll) {
      scroll.scrollIntoView({ block: 'end', behavior: 'auto' })
    }
  }

  clickChatHandler(event: Event) {
    event.preventDefault()
    const target = <HTMLDivElement>event.target
    const action = +target.dataset.id!
    const { items } = this.state
    const indexPrev = items.findIndex(
      (item: Indexed) => item.id === this.state.currentChat,
    )
    const indexCur = items.findIndex((item: Indexed) => item.id === +action!)
    if (this.state.currentChat) {
      items[indexPrev].active = false
      socketService.leave()
      this.scrolToBottom()
    }
    items[indexCur].active = true
    this.setState({
      ...this.state,
      items,
      currentChat: action,
    })
    this.getUsers(action)
    this.getChat(action)
  }

  requestMessages(token: string = this.state.token) {
    socketService.connection({
      userId: store.state.user.id,
      chatId: this.state.currentChat,
      token,
    })
  }

  async getChat(chatId: string | number) {
    const { token }: Indexed = await service.getToken(chatId)
    this.requestMessages(token)
  }

  async getChats() {
    const response: Indexed = await service.getChats()
    const items = response.map((item: Indexed) => ({
      ...item,
      ref: `${item.id}-item`,
      active: false,
      events: {
        click: this.clickChatHandler.bind(this),
      },
    }))
    this.setState({
      ...this.state,
      items,
    })
  }

  async getUsers(chatId: number) {
    const users = await service.getUsers(chatId)
    store.set({
      usersOfChat: users,
    })
    this.setState({
      ...this.state,
      users,
    })
  }

  async addNewChat(title: string) {
    const chatId = await service.addNewChat(title)
    return chatId
  }

  async removeChat(chatId: number) {
    const result = await service.removeChat(chatId)
    return result
  }

  async addUsersToChat(users: number[], chatId: number) {
    await service.addUsersToChat(users, chatId)
    this.getUsers(chatId)
  }

  async removeUsersFromChat(users: number[], chatId: number) {
    await service.removeUsersFromChat(users, chatId)
    this.getUsers(chatId)
  }

  buttonModalHandler(event: Event) {
    event.preventDefault()
    const target = <HTMLButtonElement>event.target
    const input = this.refs.modal.querySelector('input')!
    const inputValue = input.value
    const userId = input.dataset.userId!
    const action = target.dataset.type
    if (action === 'add-user') {
      if (userId) {
        this.addUsersToChat([+userId], this.state.currentChat)
      }
    }

    if (action === 'remove-user') {
      const checkboxes = Array.from(
        this.refs.modal.querySelectorAll('[data-type="checkbox"]'),
      )
      const checkedUsers = checkboxes.filter((user) => (user as HTMLInputElement).checked)
      if (checkedUsers.length) {
        const usersId = checkedUsers.map((user) => +user.id)
        this.removeUsersFromChat(usersId, this.state.currentChat)
      }
    }

    if (action === 'add-chat') {
      this.addNewChat(inputValue)
      this.setState({
        ...this.state,
        currentChat: 0,
      })
      this.getChats()
    }

    if (action === 'remove-chat') {
      this.removeChat(this.state.currentChat)
      this.setState({
        ...this.state,
        currentChat: 0,
      })
      this.getChats()
    }
  }

  sendMessage(message: string) {
    socketService.sendMessages(message)

    this.setState({
      messages: store.state.messages,
      ...this.state,
    })
  }

  messageButtonHandler(event: Event) {
    event.preventDefault()
    const input = document.querySelector<HTMLInputElement>(
      '.chats__input_message',
    )
    const message = input!.value

    if (!message) {
      input!.classList.add('chats__input_error')
      setTimeout(() => {
        input!.classList.remove('chats__input_error')
      }, 1000)
      return
    }
    this.sendMessage(message)
    this.scrolToBottom()
  }

  toggleModal(event?: Event) {
    const modal = document.querySelector('.modal')
    if (!event) {
      modal?.classList.toggle('modal_show')
    } else if ((<HTMLDivElement>event.target).dataset.modal === 'wrap') {
      modal?.classList.toggle('modal_show')
    }
  }

  addChatHandler(event: Event) {
    event.preventDefault()
    this.setChildProps('modal', {
      title: 'Добавить чат',
      buttonText: 'Добавить',
      inputHide: false,
      inputName: 'first_name',
      inputText: 'Имя',
      inputDataset: 'add-chat',
      buttonDataset: 'add-chat',
      users: null,
    })
    this.toggleModal()
  }

  userMenuClickHandler(event: Event) {
    const target = <HTMLDivElement>event.target
    const action = target.dataset.button

    if (action === 'toogle') {
      const functions = target.querySelector('.user-menu__functions')
      functions?.classList.toggle('user-menu__functions_hidden')
    }

    if (action === 'add-user') {
      this.setChildProps('modal', {
        title: target.textContent?.trim(),
        buttonText: 'Добавить',
        inputHide: false,
        inputName: 'login',
        inputText: 'Логин',
        inputDataset: action,
        buttonDataset: action,
        users: null,
      })
      this.toggleModal()
    }

    if (action === 'remove-user') {
      const users = this.state.users.filter(
        (user: Indexed) => user.login !== this.props.user,
      )
      this.setChildProps('modal', {
        title: target.textContent?.trim(),
        buttonText: 'Удалить',
        buttonDataset: action,
        inputHide: true,
        users,
      })
      this.toggleModal()
    }
    if (action === 'remove-chat') {
      this.setChildProps('modal', {
        title: target.textContent?.trim(),
        buttonText: 'Удалить',
        inputHide: true,
        buttonDataset: action,
        users: null,
      })
      this.toggleModal()
    }
  }

  protected getStateFromProps() {
    this.state = {
      addChatLinkEvent: {
        click: this.addChatHandler.bind(this),
      },
      currentChat: 0,
      modal: {
        ref: 'modal',
        button: {
          events: {
            click: this.buttonModalHandler.bind(this),
          },
        },
        events: {
          click: this.toggleModal.bind(this),
        },
      },
      userMenuEvents: {
        click: this.userMenuClickHandler.bind(this),
      },
      button: {
        classMod: 'button_forward',
        type: 'submit',
        events: {
          click: this.messageButtonHandler.bind(this),
        },
      },
      message: {
        type: 'text',
      },
    }
  }

  render() {
    return chatsTemplate
  }
}

const withChats = connect((state) => ({
  error: state.error,
  user: state.user,
  isLoading: state.isLoading,
  messages: state.messages,
}))
export default withChats(Chats)
