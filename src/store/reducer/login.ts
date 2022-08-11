import { Token } from '@/types/data'
import { LoginAction } from '@/types/store'
const initialState: Token = {
  token: '',
  refresh_token: '',
}
export const login = (state = initialState, action: LoginAction): Token => {
  switch (action.type) {
    // login request token
    case 'login/token':
      return action.payload
    // log out
    case 'login/logout':
      return initialState
    default:
      return state
  }
}
