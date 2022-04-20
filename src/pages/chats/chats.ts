import Block from '../../core/Block'
import { chatsTemplate } from './chats.hbs'
import './chats.scss'
import { connect } from '../../utils/connect'
import Router from '../../core/Router'
import ChatsService from '../../services/chats'
import store from '../../core/Store'

const router = new Router('.app')
class Chats extends Block {
  // constructor(props) {
  //   super(props)
  //   const service = new ChatsService()
  //   const data = service.getChats()
  // }

  componentDidMount() {
    const chats = this.getChats()
    chats.then((data) => {
      const items = data.map((item) => ({
        ...item,
        events: {
          click: (e: MouseEvent) => {
            e.preventDefault()
            // let action = e.target.dataset.id
            // if (action) {
            //   console.log(action)
            // }
            console.log(e.target.dataset.id)
          },
        },
      }))
      this.setState({
        ...this.state,
        items,
      })
      console.log(this.state.items)
    })
  }

  async getChats() {
    const service = new ChatsService()
    const chats = await service.getChats()
    
    return chats
  }

  messageButtonHandler(event: Event) {
    event.preventDefault()
    const message = document.querySelector<HTMLInputElement>(
      '.chats__input_message',
    )!

    if (!message.value) {
      message.classList.add('chats__input_error')
      setTimeout(() => {
        message.classList.remove('chats__input_error')
      }, 1000)
    }
  }

  protected getStateFromProps() {
    this.state = {
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
      // items: [
      //   {
      //     id: 123,
      //     title: 'Андрей',
      //     avatar: '/123/avatar1.jpg',
      //     unread_count: 15,
      //     last_message: {
      //       user: {
      //         first_name: 'Petya',
      //         second_name: 'Pupkin',
      //         avatar: '/path/to/avatar.jpg',
      //         email: 'my@email.com',
      //         login: 'userLogin',
      //         phone: '8(911)-222-33-22',
      //       },
      //       time: '2020-01-02T14:22:22.000Z',
      //       content: 'this is message content',
      //     },
      //   },
      // ],
      items: [],
    }
  }

  render() {
    return chatsTemplate
  }
}

const withChats = connect((state) => ({
  error: state.error,
  user: state.user,
}))
export default withChats(Chats)
