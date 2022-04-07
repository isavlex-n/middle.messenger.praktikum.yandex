export const profileTemplate = `<section class="flex">
  {{{Back}}}
    <div class="profile">
      <div class="profile__content">
        {{{Choose}}}
        <h1 class="profile__name center">{{userName}}</h1>
        <form class="profile__fields">
          <div class="profile__change-data">
            {{#each fields}}
              {{{Field
                  ref=this.ref
                  name=this.name
                  label=this.label
                  value=this.value
                  type=this.type
                  id=this.id
                  readonly=this.readonly
                  events=this.events
              }}}
              {{{InputError ref=this.refError classMod='input-error_profile'}}}
            {{/each}}
            
          </div>
          <div class="profile__change-pass profile__change-pass_hidden">
            {{#each passwords}}
              {{{Field
                  ref=this.ref
                  label=this.label
                  value=this.value
                  type=this.type
                  id=this.id
                  events=this.events
                  name=this.name
              }}}
              {{{InputError ref=this.refError classMod='input-error_profile'}}}
            {{/each}}
          </div>
        </form>
        <div class="profile__links">
          {{#each links}}
            <div class="profile__link">
              {{{Link textLink=this.textLink link=this.link classLink=this.classLink events=this.events}}}
            </div>
          {{/each}}
        </div>
      </div>
      <div class="profile__button profile__button_hidden">
        {{{Button text=button.text events=button.events}}}
      </div>
      
    
  </div>
  
</section>`
