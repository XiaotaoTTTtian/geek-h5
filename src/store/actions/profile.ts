import { http } from '@/utils'
import { RootThunkAction } from '@/types/store'
import { User } from '@/types/data'
type UserResponse = {
  message: string
  data: User
}
// obtain user's personal information
export const getInformation = (): RootThunkAction => {
  return async (dispatch) => {
    const res = await http.get<UserResponse>('/user')
    console.log(res)
    dispatch({ type: 'user/getInformation', payload: res.data.data })
  }
}
