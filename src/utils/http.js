import axios from 'axios';
import store from '@/store';
import { message } from 'antd';
import { logout } from '@/store/actions';
import { customHistory } from './history';

export const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})
// request interceptor
http.interceptors.request.use(config => {
  const {loginReducer: token} = store.getState()
  if(!config.url.startsWith('/authorizations')) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
// reponse interceptor
http.interceptors.response.use(undefined, error => {
  if(!error.response) {
    message.warning('请求超时');
    return Promise.reject(error)
  }
  if(error.response.status === 401) {
    message.error(error.response.data?.message, 1.5, () => {
      // clear token
      store.dispatch(logout())
      // jump to the login page with the current page you want to visit, so you can return to the page after you log in
      customHistory.push('/login', {
        from: customHistory.location.pathname
      })
    })
  }
  return Promise.reject(error)
})