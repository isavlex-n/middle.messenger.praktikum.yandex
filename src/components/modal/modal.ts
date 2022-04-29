import Block from '../../core/Block'
import { isValid } from '../../utils/validateInputHandler'
import userService from '../../services/users'
import './modal.scss'
import { ACTIONS } from '../../pages/chats/actions'

export class Modal extends Block {
  static nameOfComponent = 'Modal'

  suggestClickHandler(event: Event) {
    const target = event.target as HTMLLIElement
    const input = this.refs.inputModalRef.querySelector('input')!
    const action = target.dataset.type
    if (action) {
      input.value = target.textContent!
      input.dataset.userId = target.id
    }
  }

  async getUsersByLogin(login: string, type: string) {
    let users
    if (type === ACTIONS.ADD_USER) {
      users = await userService.searchUserByLogin(login)
    }

    this.setChildProps('suggest', {
      items: users,
      events: {
        click: this.suggestClickHandler.bind(this),
      },
    })
  }

  async inputHandler(event: Event) {
    event.preventDefault()
    const target = event.target as HTMLInputElement
    const type = target.dataset.type!
    if (type === ACTIONS.ADD_USER) {
      if (isValid({ [target.name]: target.value })) {
        await this.getUsersByLogin(target.value, type)
      }
    }
  }

  protected getStateFromProps() {
    this.state = {
      users: [],
      inputEvents: {
        input: this.inputHandler.bind(this),
      },
    }
  }

  protected render(): string {
    // language=hbs
    return `
      <div class="modal {{#if show}}modal_show{{/if}}" data-modal="wrap">
        <div class="modal__window" data-modal="window">
          <h3 class="modal__title">{{title}}</h3>
          <div class="modal__input">
            
            {{{Input
                autocomplete="off"
                hide=inputHide
                name=inputName
                text=inputText
                id=inputId
                type=inputType
                value=inputValue
                events=inputEvents
                ref="inputModalRef"
                dataset=inputDataset
            }}}
            {{{Suggest
              ref="suggest"
            }}}
            {{{InputError ref="errorModal"}}}
            {{#if users}}
              {{#each users}}
                {{{Input
                  mode="input_checkbox"
                  type="checkbox"
                  text=this.login
                  name=this.login
                  id=this.id
                  dataset="checkbox"
                }}}
              {{/each}}
              
            {{/if}}
          </div>
          <div class="modal__input">
            {{{Button
              type="button"
              text=buttonText
              events=buttonEvents
              dataset=buttonDataset
            }}}
          </div>
        </div>
      </div>
    `
  }
}
