import axios from 'axios'
import store from '@/store'
import { Toast } from 'antd-mobile'
// import { logout } from '@/store/actions';
import { RefreshTokenResponse } from '@/types/data'
import { delToken, setToken } from './token'
import customHistory from './history'

export const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 10000,
})
// request interceptor
http.interceptors.request.use((config) => {
  const {
    login: { token },
  } = store.getState()

  if (!config.url?.startsWith('/authorizations')) {
    config.headers!.Authorization = `Bearer ${token}`
  }
  return config
})
// reponse interceptor
http.interceptors.response.use(undefined, async (error) => {
  if (!error.response) {
    Toast.show({
      icon: 'error',
      content: '网络繁忙，请稍后重试',
      duration: 2000,
    })
    return Promise.reject(error)
  }
  if (error.response.status === 401) {
    try {
      const {
        login: { refresh_token },
      } = store.getState()
      if (!refresh_token) {
        console.log('没有refresh_token')

        // if there is no refresh token, a rejection period is thrown
        // using await allows a catch to catch an error
        await Promise.reject(error)
      }
      // send a request for a new token
      const res = await axios.put<RefreshTokenResponse>(
        'http://geek.itheima.net/v1_0/authorizations',
        null,
        {
          headers: {
            Authorization: `Bearer ${refresh_token}`,
          },
        }
      )
      console.log(res)
      // assembling a new token
      const tokens = {
        token: res.data.data.token,
        refresh_token,
      }
      setToken(tokens)
      store.dispatch({ type: 'login/token', payload: tokens })
      // complete the previous action
      return http(error.config)
    } catch (e) {
      // if the refresh token is invalid, exit
      store.dispatch({ type: 'login/logout' })
      delToken()

      Toast.show({
        content: '登录超时，请重新登录',
        duration: 1500,
        afterClose: () => {
          // return to the login page
          customHistory.push('/login', {
            from: customHistory.location.pathname,
          })
        },
      })
    }
  }
  return Promise.reject(error)
})
