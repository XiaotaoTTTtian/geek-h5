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
// no inductive refresh token
export type RefreshTokenResponse = ApiResponse<{ token: string }>
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
// subscriber data
export type UserProfile = {
  id: string
  photo: string
  name: string
  mobile: string
  gender: number
  birthday: string
  intro: string
}
export type UserProfileResponse = ApiResponse<UserProfile>
// modify the picture
export type UserPhotoResponse = ApiResponse<{ photo: string }>
