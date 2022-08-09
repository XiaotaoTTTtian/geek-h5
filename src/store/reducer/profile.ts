import { User, UserProfile } from '@/types/data'
import { UserAction } from '@/types/store'

type ProfileState = {
  user: User
  userProfile: UserProfile
}
const initialState = {
  user: {},
  userProfile: {},
} as ProfileState
export const profile = (
  state = initialState,
  action: UserAction
): ProfileState => {
  switch (action.type) {
    // login request token
    case 'user/getInformation':
      return { ...state, user: action.payload }
    // subscriber data
    case 'user/getProfile':
      return { ...state, userProfile: action.payload }
    default:
      return state
  }
}
