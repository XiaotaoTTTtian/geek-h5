import { Channel } from '@/types/data'
import { HomeAction } from '@/types/store'
import sortBy from 'lodash/sortBy'
type HomeState = {
  userChannel: Channel[]
  restChannel: Channel[]
  channelActiveKey: number
}
const initialState: HomeState = {
  userChannel: [],
  restChannel: [],
  channelActiveKey: 0,
}
export const home = (state = initialState, action: HomeAction): HomeState => {
  switch (action.type) {
    // get channel list data
    case 'home/getChannels':
      return {
        ...state,
        userChannel: action.payload,
      }
    case 'home/getRestChannel':
      return {
        ...state,
        restChannel: action.payload,
      }
    case 'home/ClickHighlighting':
      return {
        ...state,
        channelActiveKey: action.payload,
      }
    case 'home/deleteChannel':
      return {
        ...state,
        userChannel: state.userChannel.filter(
          (item) => item.id !== action.payload.id
        ),
        restChannel: sortBy([...state.restChannel, action.payload], ['id']),
      }
    case 'home/addChannel':
      return {
        ...state,
        userChannel: sortBy([...state.userChannel, action.payload], ['id']),
        restChannel: state.restChannel.filter(
          (item) => item.id !== action.payload.id
        ),
      }
    default:
      return state
  }
}
