import Block from './Block'
import Handlebars, {HelperOptions} from 'handlebars'

interface BlockConstructable<Props = any> {
  new (props: Props): Block
  nameOfComponent: string
}

export default function registerComponent<Props = any>(
  Component: BlockConstructable
) {
  Handlebars.registerHelper(
    Component.nameOfComponent,
    function ({hash: {ref, ...hash}, data}: HelperOptions) {
      if (!data.root.children) {
        data.root.children = {}
      }

      if (!data.root.refs) {
        data.root.refs = {}
      }

      const {children, refs} = data.root
      const context = hash.data ? hash.data : hash
      const component = new Component(context)

      children[component.id] = component
      if (ref) {
        refs[ref] = component.getContent()
      }

      return `<div data-id="${component.id}"></div>`
    }
  )
}
