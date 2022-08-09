// generic tool types
type ApiResponse<Data> = {
  message: string
  data: Data
}
// login
export type Token = {
  token: string
  refresh_token: string
}
export type LoginResponse = ApiResponse<Token>
// personal information
export type User = {
  id: string
  name: string
  photo: string
  art_count: number
  follow_count: number
  fans_count: number
  like_count: number
}
export type UserResponse = ApiResponse<User>
