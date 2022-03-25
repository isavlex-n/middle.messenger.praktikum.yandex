export const form = `<form class='form form_{{mod}}'>
  <h1 class="form__header">{{header}}</h1>
  <ul class='form__list'>
    {{#each inputs}}
      <li class='form__list-item'>
        <label class='form__label' for='{{this.id}}'>
          {{this.text}}:

        </label>
        <input
          name='{{this.name}}'
          type='{{this.type}}'
          id='{{this.id}}'
          class='form__input form__input_{{this.name}}'
        />
        <div class="form__error form__error_hidden">{{this.error}}</div>
      </li>
      

    {{/each}}
    
    <li class='form__list-item form__list-item_button'>
      {{>button button}}
    </li>
    <li class='form__list-item'>
      <a href="{{link}}" class="form__link">{{textLink}}</a>
    </li>
  </ul>
</form>`