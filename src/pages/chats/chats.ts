import Block from '../../core/Block'
import { chatsTemplate } from './chats.hbs'
import './chats.scss'
import { connect } from '../../utils/connect'
import chatsService from '../../services/chats'
import socketService from '../../services/socket'
import store from '../../core/Store'
import { ACTIONS } from './actions'

class Chats extends Block {
  async componentDidMount() {
    store.set({
      messages: [],
    })
    await this.getChats()
  }

  async clickChatHandler(event: Event) {
    event.preventDefault()
    store.set({
      messages: [],
    })
    const target = <HTMLDivElement>event.target
    const action = +target.dataset.id!
    const { items } = this.state
    const indexPrev = items.findIndex(
      (item: Indexed) => item.id === this.state.currentChat
    )
    const indexCur = items.findIndex((item: Indexed) => item.id === +action!)
    if (this.state.currentChat) {
      items[indexPrev].active = false
      await socketService.leave()
    }
    items[indexCur].active = true
    this.setState({
      ...this.state,
      items,
      currentChat: action,
    })
    await this.getUsers(action)
    await this.getChat(action)
  }

  async requestMessages(token: string = this.state.token) {
    await socketService.connection({
      userId: store.state.user.id,
      chatId: this.state.currentChat,
      token,
    })
  }

  async getChat(chatId: string | number) {
    const { token }: Indexed = await chatsService.getToken(chatId)
    await this.requestMessages(token)
  }

  async getChats() {
    const response: Indexed = await chatsService.getChats()
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
    const users = await chatsService.getUsers(chatId)
    store.set({
      usersOfChat: users,
    })
    this.setState({
      ...this.state,
      users,
    })
  }

  async addUsersToChat(users: number[], chatId: number) {
    await chatsService.addUsersToChat(users, chatId)
    this.getUsers(chatId)
  }

  async removeUsersFromChat(users: number[], chatId: number) {
    await chatsService.removeUsersFromChat(users, chatId)
    this.getUsers(chatId)
  }

  async buttonModalHandler(event: Event) {
    event.preventDefault()
    const target = <HTMLButtonElement>event.target
    const input = this.refs.modal.querySelector('input')
    if (input) {
      const inputValue = input.value
      const userId = input.dataset.userId!
      const action = target.dataset.type
      if (action === ACTIONS.ADD_USER) {
        if (userId) {
          await this.addUsersToChat([+userId], this.state.currentChat)
        }
      }

      if (action === ACTIONS.REMOVE_USER) {
        const checkboxes = Array.from(
          this.refs.modal.querySelectorAll('[data-type="checkbox"]')
        )
        const checkedUsers = checkboxes.filter(
          (user) => (user as HTMLInputElement).checked
        )
        if (checkedUsers.length) {
          const usersId = checkedUsers.map((user) => +user.id)
          await this.removeUsersFromChat(usersId, this.state.currentChat)
        }
      }

      if (action === ACTIONS.ADD_CHAT) {
        await chatsService.addNewChat(inputValue)
        this.setState({
          ...this.state,
          currentChat: 0,
        })
        await this.getChats()
      }

      if (action === ACTIONS.REMOVE_CHAT) {
        await chatsService.removeChat(this.state.currentChat)
        this.setState({
          ...this.state,
          currentChat: 0,
        })
        await this.getChats()
      }
    }
  }

  async sendMessage(message: string) {
    await socketService.sendMessages(message)

    this.setState({
      messages: store.state.messages,
      ...this.state,
    })
  }

  async messageButtonHandler(event: Event) {
    event.preventDefault()
    const input = document.querySelector<HTMLInputElement>(
      '.chats__input_message'
    )
    if (input) {
      const message = input.value
      if (!message) {
        input.classList.add('chats__input_error')
        setTimeout(() => {
          input.classList.remove('chats__input_error')
        }, 1000)
        return
      }
      await this.sendMessage(message)
    }
  }

  toggleModal(event?: Event) {
    const modal = document.querySelector('.modal')
    if (!event && modal) {
      modal.classList.toggle('modal_show')
    } else if (
      event &&
      modal &&
      (<HTMLDivElement>event.target).dataset.modal === 'wrap'
    ) {
      modal.classList.toggle('modal_show')
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

    if (action === ACTIONS.TOOGLE) {
      const functions = target.querySelector('.user-menu__functions')
      if (functions) {
        functions.classList.toggle('user-menu__functions_hidden')
      }
    }

    if (action === ACTIONS.ADD_USER) {
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

    if (action === ACTIONS.REMOVE_USER) {
      const users = this.state.users.filter(
        (user: Indexed) => user.login !== this.props.user
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
    if (action === ACTIONS.REMOVE_CHAT) {
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

  async onTop(length: number) {
    if (length % 20 === 0) {
      await socketService.getMessages(length)
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
      onTop: this.onTop.bind(this),
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
