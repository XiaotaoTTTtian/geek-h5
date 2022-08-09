import { User } from '@/types/data'
import { UserAction } from '@/types/store'

type ProfileState = {
  user: User
}
const initialState = {
  user: {},
} as ProfileState
export const profile = (
  state = initialState,
  action: UserAction
): ProfileState => {
  switch (action.type) {
    // login request token
    case 'user/getInformation':
      return { ...state, user: action.payload }
    default:
      return state
  }
}
