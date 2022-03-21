export const data = {
  userName: 'Иван',
  fields: [
    { name: 'Почта', value: 'login@yandex.ru'},
    { name: 'Логин', value: 'login'},
    { name: 'Имя', value: 'Иван'},
    { name: 'Фамилия', value: 'Иванов'},
    { name: 'Имя в чате', value: 'Иван'},
    { name: 'Телефон', value: '+7 (909) 999 99 99'},
  ],
  password: [
    { name: 'Старый пароль', value: '*****', type: 'password'},
    { name: 'Новый пароль', value: '*****', type: 'password'},
    { name: 'Подтвердите новый пароль', value: '*****', type: 'password'},
  ],
  links: [
    {link: '#', textLink: 'Изменить данные'},
    {link: '#', textLink: 'Изменить пароль'},
    {link: '#', textLink: 'Выйти', classLink: 'link_red'},
  ],
}