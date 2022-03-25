export const field = `<div class='field'>
  <label for='{{this.id}}' class='field__label'>{{this.name}}</label>
  <input
    id='{{this.id}}'
    type='{{this.type}}'
    class='field__input'
    readonly='{{this.readonly}}'
    value='{{this.value}}'
  />
</div>`