import { Input, NavBar } from 'antd-mobile'
import classnames from 'classnames'
import { useHistory } from 'react-router-dom'
import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { io, Socket } from 'socket.io-client'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/types/store'

type ChatType = {
  message: string
  type: 'user' | 'xz'
}
type socketResponse = {
  msg: string
  timestamp: number
}
const Chat = () => {
  const history = useHistory()
  const [chatList, setChatList] = useState<ChatType[]>([])
  const { token } = useSelector((state: RootState) => state.login)
  const [value, setValue] = useState('')
  const socketRef = useRef<Socket>()
  const chatListRef = useRef<HTMLDivElement>(null)
  // start and receive chat content
  useEffect(() => {
    // connection establishment
    let socktIo = io('http://toutiao.itheima.net', {
      query: {
        token,
      },
      // connection type
      transports: ['websocket'],
    })
    socketRef.current = socktIo
    const aChat = () => {
      // successfu iconnection
      socktIo.on('connect', () => {
        console.log('链接成功')
        setChatList([
          { message: '你好，我是小智', type: 'xz' },
          { message: '你有什么疑问？', type: 'xz' },
        ])
      })
    }
    aChat()
    // receive the message returned by the server
    socktIo.on('message', (data: socketResponse) => {
      console.log(data)

      setChatList((list) => [...list, { message: data.msg, type: 'xz' }])
    })
    return () => {
      socktIo.close()
    }
  }, [])
  useEffect(() => {
    const chatListDOM = chatListRef.current
    if (!chatListDOM) return
    chatListDOM.scrollTop = chatListDOM.scrollHeight
  }, [chatList])
  // send a message
  const onSend = () => {
    if (value.trim() === '') return
    socketRef.current?.emit('message', {
      msg: value,
      timestamp: Date.now() + '',
    })
    setChatList([
      ...chatList,
      {
        type: 'user',
        message: value,
      },
    ])
    setValue('')
  }
  return (
    <div className={styles.root}>
      <NavBar className="fixed-header" onBack={() => history.go(-1)}>
        小智同学
      </NavBar>

      <div className="chat-list" ref={chatListRef}>
        {chatList.map((item, index) => (
          <div
            key={index}
            className={classnames(
              'chat-item',
              item.type === 'xz' ? 'self' : 'user'
            )}
          >
            {item.type === 'xz' ? (
              <Icon type="iconbtn_xiaozhitongxue" />
            ) : (
              <img src="http://geek.itheima.net/images/user_head.jpg" alt="" />
            )}
            <div className="message">{item.message}</div>
          </div>
        ))}
      </div>

      <div className="input-footer">
        <Input
          className="no-border"
          placeholder="请描述您的问题"
          onEnterPress={onSend}
          value={value}
          onChange={setValue}
        />
        <Icon type="iconbianji" />
      </div>
    </div>
  )
}

export default Chat
