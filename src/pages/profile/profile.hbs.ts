export const profileTemplate = `<section class="flex">
  {{{Back}}}
    <div class="profile">
      <div class="profile__content">
        {{{Choose}}}
        <h1 class="profile__name center">{{userName}}</h1>
        <div class="profile__fields">
          {{#each fields}}
            {{{Field data=this}}}
          {{/each}}
        </div>
        <div class="profile__links">
          {{#each links}}
            <div class="profile__link">
              {{{Link data=this}}}
            </div>
          {{/each}}
        </div>
      </div>
      <div class="profile__button profile__button_hidden">
        {{{Button text='Сохранить'}}}
      </div>
      
    
  </div>
  
</section>`