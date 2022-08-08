const TOKEN_KEY = 'geek-pc-tao'
// get token
export const getToken = () => localStorage.getItem(TOKEN_KEY)
// set token
export const setToken = str => localStorage.setItem(TOKEN_KEY, str)
// clear token
export const delToken = () => localStorage.setItem(TOKEN_KEY, '')
// whether the login
export const isLogin = () => !!(localStorage.getItem(TOKEN_KEY))