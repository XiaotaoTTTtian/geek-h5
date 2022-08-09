import { RootThunkAction } from '@/types/store'
import { Token } from '@/types/data'
import { http, setToken } from '@/utils'
import { Toast } from 'antd-mobile'
// the parameter type of the function
type LoginForm = {
  mobile: string
  code: string
}
// response type of the interface
type loginResponse = {
  message: string
  data: Token
}
// login request token
export const getToken = (data: LoginForm): RootThunkAction => {
  return async (dispatch) => {
    const res = await http.post<loginResponse>('/authorizations', data)
    Toast.show({
      icon: 'success',
      content: '登录成功',
    })
    // in the local
    setToken(res.data.data)
    dispatch({ type: 'login/token', payload: res.data.data })
  }
}
// get code
export const getCodes = (mobile: string): RootThunkAction => {
  return async () => {
    await http.get(`/sms/codes/${mobile}`)
    Toast.show({
      icon: 'success',
      content: '正在获取验证码',
    })
  }
}
