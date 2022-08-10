import { http } from '@/utils'
import { RootThunkAction } from '@/types/store'
import { UserResponse, UserProfileResponse, UserProfile } from '@/types/data'
import { Toast } from 'antd-mobile'
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
// update personal information
export const updateUser = (
  userProfile: Partial<UserProfile>
  // userProfile: object
): RootThunkAction => {
  return async (diapatch) => {
    console.log(userProfile)
    await http.patch('/user/profile', userProfile)
    diapatch({ type: 'user/update', payload: userProfile })
    Toast.show({
      content: '修改昵称完成',
      duration: 1000,
    })
  }
}
