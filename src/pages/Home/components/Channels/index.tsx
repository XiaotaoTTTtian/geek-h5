import classnames from 'classnames'

import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { getAllChannel, addChannel } from '@/store/actions/home'
import { useInitialState } from '@/utils/use-initial-state'

import { AppThunkDispatch } from '@/types/store'
import { useDispatch } from 'react-redux'

import { ClickHighlighting, deleteChannel } from '@/store/actions/home'
import { Channel } from '@/types/data'
import { useState } from 'react'
type channel = {
  onBack: () => void
}

const Channels = ({ onBack }: channel) => {
  const { restChannel, userChannel, channelActiveKey } = useInitialState(
    getAllChannel,
    'home'
  )
  const [isEdit, setIsEdit] = useState(false)
  const dispatch = useDispatch<AppThunkDispatch>()
  const onChannelClick = (channel: Channel): void => {
    if (isEdit) {
      console.log('edit')

      // edit status
      // recommended channels cannot be deleted
      if (channel.id === 0) return
      // the number of channels is greater than or equal to 4
      if (userChannel.length <= 4) return
      if (channelActiveKey === channel.id) return
      console.log('aa')

      dispatch(deleteChannel(channel))
    } else {
      // non-edit state
      dispatch(ClickHighlighting(channel))
      onBack()
    }
  }

  return (
    <div className={styles.root}>
      <div className="channel-header">
        <Icon type="iconbtn_channel_close" onClick={onBack} />
      </div>
      <div className="channel-content">
        {/* 编辑时，添加类名 edit */}
        <div className={classnames('channel-item', isEdit && 'edit')}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">点击进入频道</span>
            <span
              className="channel-item-edit"
              onClick={() => setIsEdit(!isEdit)}
            >
              {isEdit ? '完成' : '编辑'}
            </span>
          </div>
          <div className="channel-list">
            {/* 选中时，添加类名 selected */}
            {userChannel.map((item) => (
              <span
                key={item.id}
                className={classnames('channel-list-item', {
                  selected: channelActiveKey === item.id,
                })}
                onClick={() => onChannelClick(item)}
              >
                {item.name}
                {item.id !== 0 && item.id !== channelActiveKey && (
                  <Icon type="iconbtn_tag_close" />
                )}
              </span>
            ))}
          </div>
        </div>

        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
            <span className="channel-item-title-extra">点击添加频道</span>
          </div>
          <div className="channel-list">
            {restChannel.map((item) => (
              <span
                className="channel-list-item"
                key={item.id}
                onClick={() => dispatch(addChannel(item))}
              >
                + {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channels
