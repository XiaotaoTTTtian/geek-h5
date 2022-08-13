import { ArticlesResponse } from '@/types/data'
import { RootThunkAction } from '@/types/store'
import { http } from '@/utils'

// get article list data
export const getArticleList = (
  channel_id: number,
  timestamp: string
): RootThunkAction => {
  return async (dispatch) => {
    console.log(timestamp)
    const res = await http.get<ArticlesResponse>('/articles', {
      params: {
        channel_id,
        timestamp,
      },
    })
    console.log(res.data)
    dispatch({
      type: 'home/getArticleList',
      payload: { channelId: channel_id, data: res.data.data },
    })
  }
}
