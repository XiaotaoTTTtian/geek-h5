import axios from 'axios'
import store from '@/store'
import { Toast } from 'antd-mobile'
// import { logout } from '@/store/actions';
import { customHistory } from './history'

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
http.interceptors.response.use(undefined, (error) => {
  console.log(1, error)
  if (!error.response) {
    Toast.show({
      icon: 'error',
      content: '网络繁忙，请稍后重试',
      duration: 2000,
    })
    return Promise.reject(error)
  }
  if (error.response.status === 401 || error.response.status === 400) {
    Toast.show({
      content: error.response.data?.message,
      duration: 1500,
      afterClose: () => {
        customHistory.push('/login', {
          from: customHistory.location.pathname,
        })
      },
    })
  }
  return Promise.reject(error)
})
