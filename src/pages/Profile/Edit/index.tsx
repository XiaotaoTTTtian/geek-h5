import { Button, List, DatePicker, NavBar, Popup, Dialog } from 'antd-mobile'
import classNames from 'classnames'
import { useHistory } from 'react-router-dom'
import { getProfile } from '@/store/actions/profile'
import { useInitialState } from '@/utils/use-initial-state'
import React from 'react'
import dayjs from 'dayjs'

import styles from './index.module.scss'
import EditInput from './components/EditInput'
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppThunkDispatch } from '@/types/store'
import { updateUser, updatePhoto } from '@/store/actions/profile'
import { Logout } from '@/store/actions/login'
import EditList from './components/EditList'
const Item = List.Item

type ListPopup = {
  type: '' | 'gender' | 'photo'
  visibel: boolean
}
type InputPopup = {
  type: '' | 'name' | 'intro'
  value: string
  visibel: boolean
}
const ProfileEdit = () => {
  const history = useHistory()
  const dispatch = useDispatch<AppThunkDispatch>()
  const fileRef = useRef<HTMLInputElement>(null)
  // decide whether it's photo or local
  const [isLocal, setIsLocal] = useState(true)
  // show the date selector
  const [showBirthday, setShowBirthday] = useState(false)
  const [listPopup, setIistPopup] = useState<ListPopup>({
    type: '',
    visibel: false,
  })

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
  const onListPopupHide = () => {
    setIistPopup({
      type: '',
      visibel: false,
    })
  }
  // modify nicknames and profiles
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
  const { userProfile } = useInitialState(getProfile, 'profile')
  // modify the nickname
  const updatePersonalInformation = (
    type: 'name' | 'intro' | 'gender' | 'photo' | 'birthday',
    value: string
  ) => {
    if (type === 'photo') {
      // decide whether it's photo or local
      setIsLocal(value === 'photograhp')
      return fileRef.current?.click()
    }
    if (value === userProfile.name || value.trim() === '') return
    dispatch(updateUser({ [type]: value }))
  }
  // modify the picture
  const onChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files?.[0])
    const file = e.target.files?.[0]
    if (!file) return
    const photoData = new FormData()
    photoData.append('photo', file)
    dispatch(updatePhoto(photoData))
  }
  // update birthday
  const updateBirthday = (date: Date) => {
    updatePersonalInformation('birthday', dayjs(date).format('YYYY-MM-DD'))
    setShowBirthday(false)
  }
  // log out
  const onLogout = () => {
    Dialog.show({
      title: '温馨提示',
      content: '亲，你确定退出吗？',
      closeOnAction: true,
      actions: [
        [
          {
            key: 'cancel',
            text: '取消',
          },
          {
            key: 'delete',
            text: '退出',
            onClick: () => {
              dispatch(Logout())
              history.push('/login')
            },
            style: {
              color: '#ccc',
            },
          },
        ],
      ],
    })
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
              onClick={() => setIistPopup({ type: 'photo', visibel: true })}
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
            <Item
              arrow
              extra={userProfile.gender + '' === '0' ? '男' : '女'}
              onClick={() => setIistPopup({ type: 'gender', visibel: true })}
            >
              性别
            </Item>
            <Item
              arrow
              extra={userProfile.birthday}
              onClick={() => setShowBirthday(true)}
            >
              生日
            </Item>
          </List>

          <DatePicker
            visible={showBirthday}
            value={new Date(userProfile.birthday)}
            title="选择年月日"
            min={new Date(1900, 0, 1, 0, 0, 0)}
            max={new Date()}
            onConfirm={updateBirthday}
            onCancel={() => setShowBirthday(false)}
          />
        </div>

        <div className="logout">
          <Button className="btn" onClick={onLogout}>
            退出登录
          </Button>
        </div>
      </div>
      {/* modify the nickname and introduction components */}
      <Popup visible={inputPopup.visibel} position="right">
        <EditInput
          onBack={onInputHide}
          value={inputPopup.value}
          type={inputPopup.type}
          onUpdateProfile={updatePersonalInformation}
        />
      </Popup>
      {/* modify the gender */}
      <Popup visible={listPopup.visibel} onMaskClick={onListPopupHide}>
        <EditList
          onClose={onListPopupHide}
          type={listPopup.type}
          onUpdateProfile={updatePersonalInformation}
        />
      </Popup>
      {isLocal ? (
        <input type="file" hidden ref={fileRef} onChange={onChangePhoto} />
      ) : (
        <input
          type="file"
          hidden
          ref={fileRef}
          onChange={onChangePhoto}
          capture="user"
          accept="image/*"
        />
      )}
    </div>
  )
}

export default ProfileEdit
