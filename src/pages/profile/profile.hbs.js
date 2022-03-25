export const profile = `<section class="flex">
  {{> back }}
    <div class="profile">
      <div class="profile__content">
        {{> choose}}
        <h1 class="profile__name center">{{userName}}</h1>
        <div class="profile__fields">
          {{#each fields}}
            {{!-- <div class="profile__field">
              <label for="{{this.id}}" class="profile__label">{{this.name}}</label>
              <input id="{{this.id}}" type="{{this.type}}" class="profile__input" readonly="{{this.readonly}}" value="{{this.value}}"/>
            </div> --}}
            {{>field}}
          {{/each}}
        </div>
        <div class="profile__links">
          {{#each links}}
            <div class="profile__link">
              {{>link this}}
            </div>
          {{/each}}
        </div>
      </div>
      <div class="profile__button profile__button_hidden">
        {{> button text='Сохранить'}}
      </div>
      
    
  </div>
  
</section>`