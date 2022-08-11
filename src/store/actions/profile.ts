import { http } from '@/utils'
import { RootThunkAction } from '@/types/store'
import {
  UserResponse,
  UserProfileResponse,
  UserProfile,
  UserPhotoResponse,
} from '@/types/data'
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
    await http.patch('/user/profile', userProfile)
    diapatch({ type: 'user/update', payload: userProfile })
    let displayContent = ''
    switch (Object.keys(userProfile)[0]) {
      case 'intro':
        displayContent = '修改简介完成'
        break
      case 'name':
        displayContent = '修改昵称完成'
        break
      case 'gender':
        displayContent = '修改性别完成'
        break
      case 'birthday':
        displayContent = '修改生日完成'
        break

      default:
        break
    }
    Toast.show({
      content: displayContent,
      duration: 1000,
    })
  }
}
// modify the picture
export const updatePhoto = (data: FormData): RootThunkAction => {
  return async (dispatch) => {
    const res = await http.patch<UserPhotoResponse>('/user/photo', data)
    console.log(res)
    dispatch({ type: 'user/update', payload: res.data.data })
    Toast.show({
      content: '修改头像完成',
      duration: 1000,
    })
  }
}
