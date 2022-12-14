import { combineReducers } from 'redux'
import { login } from './login'
import { profile } from './profile'
import { home } from './home'
import { article } from './article'
import { search } from './search'
export const rootReducer = combineReducers({
  login,
  profile,
  home,
  article,
  search,
})
