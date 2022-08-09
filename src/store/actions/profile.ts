import { http } from '@/utils'
import { RootThunkAction } from '@/types/store'
import { UserResponse, UserProfileResponse } from '@/types/data'
// obtain user's personal information
export const getInformation = (): RootThunkAction => {
  return async (dispatch) => {
    const res = await http.get<UserResponse>('/user')
    console.log(res)
    dispatch({ type: 'user/getInformation', payload: res.data.data })
  }
}
// get subscriber data
export const getProfile = (): RootThunkAction => {
  return async (dispatch) => {
    const res = await http.get<UserProfileResponse>('/user/profile')
    // console.log(res)
    dispatch({ type: 'user/getProfile', payload: res.data.data })
  }
}
