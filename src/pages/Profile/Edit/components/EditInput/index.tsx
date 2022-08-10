import { Input, NavBar, TextArea } from 'antd-mobile'
import { useEffect, useState } from 'react'

import styles from './index.module.scss'
type Props = {
  onBack: () => void
  value: string
  onUpdateProfile: (type: 'name' | 'intro', value: string) => void
  type: '' | 'name' | 'intro'
}

const EditInput = ({ onBack, value, onUpdateProfile, type }: Props) => {
  const [inputValue, setInputValue] = useState(value)
  const isNickname = type === 'name'
  const onSave = () => {
    if (type === '') return
    // update data
    onUpdateProfile(type, inputValue)
    // return personal details
    onBack()
  }
  // update the state without destroying the component
  useEffect(() => {
    setInputValue(value ?? '')
  }, [value])
  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        right={
          <span className="commit-btn" onClick={onSave}>
            提交
          </span>
        }
        onBack={onBack}
      >
        编辑{isNickname ? '昵称' : '简介'}
      </NavBar>

      <div className="edit-input-content">
        <h3>{isNickname ? '昵称' : '简介'}</h3>
        {isNickname ? (
          <div className="input-wrap">
            <Input
              placeholder="请输入"
              value={inputValue}
              onChange={setInputValue}
            />
          </div>
        ) : (
          <TextArea
            className="textarea"
            placeholder="请输入"
            // 展示：右下角的字数统计
            showCount
            // 指定内容最大长度
            maxLength={100}
            // 指定 文本域 展示内容的行数（文本域高度）
            rows={4}
            value={inputValue}
            onChange={setInputValue}
          />
        )}
      </div>
    </div>
  )
}

export default EditInput
