export const profileTemplate = `<section class="flex">
  {{{Back}}}
    <div class="profile">
      <div class="profile__content">
        {{{Choose}}}
        <h1 class="profile__name center">{{userName}}</h1>
        <div class="profile__fields">
          {{#each fields}}
            {{{Field name=this.name value=this.value}}}
          {{/each}}
        </div>
        <div class="profile__links">
          {{#each links}}
            <div class="profile__link">
              {{{Link textLink=this.textLink link=this.link classLink=this.classLink}}}
            </div>
          {{/each}}
        </div>
      </div>
      <div class="profile__button profile__button_hidden">
        {{{Button text='Сохранить'}}}
      </div>
      
    
  </div>
  
</section>`