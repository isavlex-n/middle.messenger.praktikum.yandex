import Block from '../core/Block'

export default function renderDOM(query: string | undefined, block: Block) {
  const root = document.querySelector(query as string)
  root!.appendChild(block.getContent())
}
