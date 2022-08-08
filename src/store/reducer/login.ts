import { Token } from '@/types/data'
const initialState: Token = {
  token: '',
  refresh_token: '',
}
export const login = (state = initialState, action: unknown): Token => {
  return state
}
