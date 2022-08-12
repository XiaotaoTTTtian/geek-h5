import { ChannelResponse, Channel } from '@/types/data'
import { RootThunkAction } from '@/types/store'
import { http, isLogin } from '@/utils'
import differenceBy from 'lodash/differenceBy'

const CHANNEL_KEY = 'geek-channels'
// get channel list data
export const getChannels = (): RootThunkAction => {
  return async (dispatch) => {
    // determining whether to log in
    if (isLogin()) {
      const {
        data: {
          data: { channels },
        },
      } = await http.get<ChannelResponse>('/user/channels')
      // console.log(res.data.data)
      dispatch({ type: 'home/getChannels', payload: channels })
    } else {
      const localChannels = JSON.parse(
        localStorage.getItem(CHANNEL_KEY) ?? '[]'
      ) as Channel[]
      if (localChannels.length === 0) {
        const {
          data: {
            data: { channels },
          },
        } = await http.get<ChannelResponse>('/user/channels')
        dispatch({ type: 'home/getChannels', payload: channels })
        localStorage.setItem(CHANNEL_KEY, JSON.stringify(channels))
      } else {
        dispatch({ type: 'home/getChannels', payload: localChannels })
      }
    }
  }
}
// get channel recommendation data
export const getAllChannel = (): RootThunkAction => {
  return async (dispatch, getState) => {
    const {
      data: {
        data: { channels },
      },
    } = await http.get<ChannelResponse>('/channels')
    const { userChannel } = getState().home
    // console.log(channels)
    const restChannels = differenceBy(channels, userChannel, 'id')
    // console.log(restChannels)
    dispatch({ type: 'home/getRestChannel', payload: restChannels })
  }
}
// // click to switch the highlighting effect
export const ClickHighlighting = (channel: Channel): RootThunkAction => {
  return (dispatch) => {
    // console.log(id)

    dispatch({ type: 'home/ClickHighlighting', payload: channel.id })
  }
}
// delete the channel
export const deleteChannel = (channel: Channel): RootThunkAction => {
  return async (dispatch) => {
    // determining whether to log in
    console.log(channel)

    if (isLogin()) {
      await http.delete<ChannelResponse>(`/user/channels/${channel.id}`)
      // console.log(res.data.data)
    } else {
      const localChannels = JSON.parse(
        localStorage.getItem(CHANNEL_KEY) ?? '[]'
      ) as Channel[]
      const newLocalChannel = localChannels.filter(
        (item) => item.id !== channel.id
      )
      // console.log(newLocalChannel)
      localStorage.setItem(CHANNEL_KEY, JSON.stringify(newLocalChannel))
    }
    dispatch({ type: 'home/deleteChannel', payload: channel })
  }
}
// add channel
export const addChannel = (channel: Channel): RootThunkAction => {
  return async (dispatch) => {
    if (isLogin()) {
      console.log(channel)
      await http.patch('/user/channels', { channels: [channel] })
    } else {
      const localChannels = JSON.parse(
        localStorage.getItem(CHANNEL_KEY) ?? '[]'
      ) as Channel[]
      const newLocalChannel = [...localChannels, channel]
      localStorage.setItem(CHANNEL_KEY, JSON.stringify(newLocalChannel))
    }
    dispatch({ type: 'home/addChannel', payload: channel })
  }
}
