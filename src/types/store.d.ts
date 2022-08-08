import { ThunkAction } from 'redux-thunk'
import store from '@/store'
import { Token } from './data'
// redux specifies the state type of the application
export type RootState = ReturnType<typeof store.getState>
/**
 * @param thunk the return type of an action
 * @param redux indicates the state rootState
 * @param additional parameters, not used, can be specified as unknown
 * @param non-thunk action, which are action in the form of objects
 */
export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>
// the type of all actions in the project
type RootAction = LoginAction
export type LoginAction = {
  type: 'login/token'
  payload: Token
}
