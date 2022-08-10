import { Button, List, DatePicker, NavBar, Popup } from 'antd-mobile'
import classNames from 'classnames'
import { useHistory } from 'react-router-dom'
import { getProfile } from '@/store/actions/profile'
import { useInitialState } from '@/utils/use-initial-state'

import styles from './index.module.scss'
import EditInput from './components/EditInput'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppThunkDispatch } from '@/types/store'
import { updateUser } from '@/store/actions/profile'
const Item = List.Item

const ProfileEdit = () => {
  const history = useHistory()
  const dispatch = useDispatch<AppThunkDispatch>()
  type InputPopup = {
    type: '' | 'name' | 'intro'
    value: string
    visibel: boolean
  }
  const [inputPopup, setInputPopup] = useState<InputPopup>({
    type: '',
    value: '',
    visibel: false,
  })
  // hide the pop-up layer
  const onInputHide = () => {
    setInputPopup({
      type: '',
      value: '',
      visibel: false,
    })
  }
  // modify the nickname
  // const onInputShow = () => {
  //   setInputPopup({
  //     type: 'name',
  //     value: userProfile.name,
  //     visibel: true,
  //   })
  // }
  const onInputShow = (
    type: InputPopup['type'],
    value: InputPopup['value']
  ) => {
    setInputPopup({
      type,
      value,
      visibel: true,
    })
  }
  const onIntroShow = () => {
    setInputPopup({
      type: 'intro',
      value: userProfile.intro,
      visibel: true,
    })
  }

  const { userProfile } = useInitialState(getProfile, 'profile')
  // modify the nickname
  const updatePersonalInformation = (type: 'name' | 'intro', value: string) => {
    if (value === userProfile.name || value.trim() === '') return
    dispatch(updateUser({ [type]: value }))
  }
  return (
    <div className={styles.root}>
      <div className="content">
        {/* 标题 */}
        <NavBar
          onBack={() => history.go(-1)}
          style={{
            '--border-bottom': '1px solid #F0F0F0',
          }}
        >
          个人信息
        </NavBar>

        <div className="wrapper">
          {/* 列表 */}
          <List className="profile-list">
            {/* 列表项 */}
            <Item
              extra={
                <span className="avatar-wrapper">
                  <img
                    width={24}
                    height={24}
                    src={
                      userProfile.photo ||
                      'http://toutiao.itheima.net/images/user_head.jpg'
                    }
                    alt=""
                  />
                </span>
              }
              arrow
            >
              头像
            </Item>
            <Item
              arrow
              extra={userProfile.name}
              onClick={() => onInputShow('name', userProfile.name)}
            >
              昵称
            </Item>
            <Item
              arrow
              extra={
                <span className={classNames('intro', 'normal')}>
                  {userProfile.intro || '未填写'}
                </span>
              }
              onClick={() => onInputShow('intro', userProfile.intro ?? '')}
            >
              简介
            </Item>
          </List>

          <List className="profile-list">
            <Item arrow extra={userProfile.gender === 0 ? '男' : '女'}>
              性别
            </Item>
            <Item arrow extra={userProfile.birthday}>
              生日
            </Item>
          </List>

          <DatePicker
            visible={false}
            value={new Date()}
            title="选择年月日"
            min={new Date(1900, 0, 1, 0, 0, 0)}
            max={new Date()}
          />
        </div>

        <div className="logout">
          <Button className="btn">退出登录</Button>
        </div>
      </div>
      <Popup visible={inputPopup.visibel} position="right">
        <EditInput
          onBack={onInputHide}
          value={inputPopup.value}
          type={inputPopup.type}
          onUpdateProfile={updatePersonalInformation}
        />
      </Popup>
    </div>
  )
}

export default ProfileEdit
