import { combineReducers } from 'redux'
import { login } from './login'
import { profile } from './profile'
export const rootReducer = combineReducers({ login, profile })
