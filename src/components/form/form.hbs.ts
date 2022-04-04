// language=hbs
export const form = `
<form class='form form_{{mod}}'>
  <h1 class="form__header">{{header}}</h1>
  <div class='form__list'>
    {{#each inputs}}
      <div class='form__list-item'>
        <label class='form__label' for='{{this.id}}'>
          {{this.text}}:

        </label>
        {{{Input data=this}}}
          <div class="form__error">{{#if this.error}}{{this.error}}{{/if}}</div>
      </div>
      

    {{/each}}
    <div class='form__list-item form__list-item_button'>
      {{{Button data=button}}}
    </div>
    <div class='form__list-item'>
      <a href="{{link}}" class="form__link">{{textLink}}</a>
    </div>
  </div>
</form>`
