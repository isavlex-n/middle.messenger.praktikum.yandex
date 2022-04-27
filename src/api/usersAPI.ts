import HTTPTransport from '../core/HTTPTransport'

const usersRequest = new HTTPTransport('user')

type SearchUserData = {
  login: string
}

export type UserPassword = {
  oldPassword: string
  newPassword: string
}

export type UserProfile = {
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
}

export default class UsersAPI {
  searchUserByLogin(data: SearchUserData) {
    return usersRequest.post('search', {
      includeCredentials: true,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(data),
    })
  }

  changeUserProfile(data: UserProfile) {
    return usersRequest.put('profile', {
      includeCredentials: true,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(data),
    })
  }

  changeUserAvatar(data: FormData) {
    return usersRequest.put('profile/avatar', {
      includeCredentials: true,
      data,
    })
  }

  changeUserPassword(data: UserPassword) {
    return usersRequest.put('password', {
      includeCredentials: true,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(data),
    })
  }
}
