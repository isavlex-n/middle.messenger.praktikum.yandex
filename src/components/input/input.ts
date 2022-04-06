import Block from '../../core/Block'

import './input.scss';

interface InputProps {
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  text?: string; 
  value?: string;
  error?: string;
  errorMessage: string;
  minLength?: string;
  name?: string;
  classMod?: string;
  id?: string;
  events: {[key: string]: () => {}};
  required: string;
  errorName: string;
}

export class Input extends Block {
  static nameOfComponent = 'Input'

  constructor(props: InputProps) {
    super(props)
  }

  protected render(): string {
    // language=hbs
    return `
    <div class='input'>
      <label class='input__label' for='{{id}}'>{{text}}: </label>
      <input class="input__input {{classMod}}"
              {{#if id}}id="{{id}}"{{/if}}
              {{#if name}}name="{{name}}"{{/if}}
              {{#if type}}type="{{type}}"{{/if}}
              {{#if placeholder}}placeholder="{{placeholder}}"{{/if}}
              {{#if value}}value="{{value}}"{{/if}}
              {{#if required}}required{{/if}}
              />
              
    </div>
            `
  }
}
