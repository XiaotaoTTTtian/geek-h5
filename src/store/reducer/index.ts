import { combineReducers } from 'redux'
import { login } from './login'
import { profile } from './profile'
import { home } from './home'
export const rootReducer = combineReducers({ login, profile, home })
