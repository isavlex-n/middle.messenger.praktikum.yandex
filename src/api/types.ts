export type APIError = {
  reason: string
}

export type UserDTO = {
  avatar: string | null
  display_name: string | null
  email: string
  id: number
  login: string
  first_name: string
  phone: string
  second_name: string
}
