import { Token } from '@/types/data'
const TOKEN_KEY = 'geek-h5'
// get token
export const getToken = (): Token =>
  JSON.parse(
    localStorage.getItem(TOKEN_KEY) || '{"token":"", "refresh_token": ""}'
  )
// set token
export const setToken = (str: Token) =>
  localStorage.setItem(TOKEN_KEY, JSON.stringify(str))
// clear token
export const delToken = () => localStorage.setItem(TOKEN_KEY, '')
// whether the login
export const isLogin = () => !!localStorage.getItem(TOKEN_KEY)
