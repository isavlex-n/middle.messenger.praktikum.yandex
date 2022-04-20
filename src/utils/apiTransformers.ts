import { UserDTO } from '../api/types'

export const transformUser = (data: UserDTO): User => ({
  login: data.login,
  firstName: data.first_name,
  id: data.id,
})
