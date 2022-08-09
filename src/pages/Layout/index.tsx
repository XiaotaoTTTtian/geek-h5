import { TabBar } from 'antd-mobile'
import styles from './index.module.scss'
import { Route, useHistory, useLocation } from 'react-router-dom'
import Icon from '@/components/Icon'

import Home from '../Home'
import Question from '../Question'
import Video from '../Video'
import Profile from '../Profile'
const tabs = [
  { path: '/home/index', icon: 'iconbtn_home', text: '首页' },
  { path: '/home/question', icon: 'iconbtn_qa', text: '问答' },
  { path: '/home/video', icon: 'iconbtn_video', text: '视频' },
  { path: '/home/profile', icon: 'iconbtn_mine', text: '我的' },
]
const Layout = () => {
  const history = useHistory()
  const location = useLocation()
  // console.log(location)

  return (
    <div className={styles.root}>
      <Route exact path="/home/index">
        <Home></Home>
      </Route>
      <Route path="/home/question">
        <Question />
      </Route>
      <Route path="/home/video">
        <Video />
      </Route>
      <Route path="/home/profile">
        <Profile />
      </Route>
      {/* 使用 antd 的 TabBar 组件，并指定类名 tab-bar */}
      {/* activeKey set initial status */}
      <TabBar
        className="tab-bar"
        activeKey={location.pathname}
        onChange={(key: string) => history.push(key)}
      >
        {tabs.map((item) => (
          <TabBar.Item
            key={item.path}
            icon={(active) => (
              <Icon
                type={active ? `${item.icon}_sel` : item.icon}
                className="tab-bar-item-icon"
              />
            )}
            title={item.text}
          />
        ))}
      </TabBar>
    </div>
  )
}

export default Layout
