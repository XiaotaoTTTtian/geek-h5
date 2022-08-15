import { ArticleDetailResponse } from './../../types/data.d'
import { ArticlesResponse } from '@/types/data'
import { RootThunkAction } from '@/types/store'
import { http } from '@/utils'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)

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
// get article detaile
export const getArticleById = (id: string): RootThunkAction => {
  return async (dispatch) => {
    const {
      data: { data },
    } = await http.get<ArticleDetailResponse>(`/articles/${id}`)
    console.log(data)

    dispatch({
      type: 'article/get',
      payload: {
        ...data,
        pubdate: dayjs(data.pubdate).locale('zh-cn').format('LL'),
      },
    })
  }
}
