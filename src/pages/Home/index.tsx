import { Tabs, Popup } from 'antd-mobile'
import styles from './index.module.scss'
import { useInitialState } from '@/utils/use-initial-state'
import { getChannels } from '@/store/actions/home'
import Icon from '@/components/Icon'
import Channels from './components/Channels'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppThunkDispatch } from '@/types/store'
import ArticleList from './components/ArticleList'

const Home = () => {
  // send and get channel list data
  const { userChannel, channelActiveKey } = useInitialState(getChannels, 'home')
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch<AppThunkDispatch>()
  return (
    <div className={styles.root}>
      {/* 频道 Tabs 列表 */}
      <Tabs
        activeKey={channelActiveKey + ''}
        className="tabs"
        activeLineMode="fixed"
        onChange={(key) =>
          dispatch({ type: 'home/ClickHighlighting', payload: +key })
        }
      >
        {userChannel.map((item) => (
          <Tabs.Tab title={item.name} key={item.id}>
            <ArticleList channelId={item.id} />
          </Tabs.Tab>
        ))}
      </Tabs>
      <div className="tabs-opration">
        <Icon type="iconbtn_search" />
        <Icon type="iconbtn_channel" onClick={() => setVisible(true)} />
      </div>

      <Popup visible={visible} position="left">
        <Channels onBack={() => setVisible(false)} />
      </Popup>
    </div>
  )
}

export default Home
