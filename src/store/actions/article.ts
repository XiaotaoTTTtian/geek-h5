import {
  ArticleDetailResponse,
  AddArticleCommentResponse,
} from './../../types/data.d'
import { ArticlesResponse } from '@/types/data'
import { RootThunkAction } from '@/types/store'
import { http } from '@/utils'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { Toast } from 'antd-mobile'

dayjs.extend(localizedFormat)

// get article list data
export const getArticleList = (
  channel_id: number,
  timestamp: string
): RootThunkAction => {
  return async (dispatch) => {
    // console.log(timestamp)
    const res = await http.get<ArticlesResponse>('/articles', {
      params: {
        channel_id,
        timestamp,
      },
    })
    // console.log(res.data)
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
    // console.log(data)

    dispatch({
      type: 'article/get',
      payload: {
        ...data,
        pubdate: dayjs(data.pubdate).locale('zh-cn').format('LL'),
      },
    })
  }
}
// pay attention to the author
export const followAuthor = (
  id: string,
  isFollowed: boolean
): RootThunkAction => {
  return async (dispatch) => {
    if (isFollowed) {
      // unfollow
      await http.delete(`/user/followings/${id}`)
    } else {
      // attention
      await http.post(`/user/followings`, {
        target: id,
      })
    }
    // console.log('成功')
    dispatch({
      type: 'article/updateInfo',
      payload: {
        name: 'is_followed',
        value: !isFollowed,
      },
    })
    Toast.show({
      content: isFollowed ? '取消关注' : '已关注',
    })
  }
}
// collection of article

export const collectArticle = (
  id: string,
  isCollected: boolean
): RootThunkAction => {
  return async (dispatch) => {
    if (isCollected) {
      // delete a site collection
      await http.delete(`/article/collections/${id}`)
    } else {
      // collect
      await http.post(`/article/collections`, {
        target: id,
      })
    }
    dispatch({
      type: 'article/updateInfo',
      payload: {
        name: 'is_collected',
        value: !isCollected,
      },
    })
    Toast.show({
      content: isCollected ? '取消收藏' : '已收藏',
    })
  }
}
// the article thumb up
export const likeArticle = (id: string, attitude: number): RootThunkAction => {
  return async (dispatch) => {
    if (attitude === 1) {
      // delete a site collection
      await http.delete(`/article/likings/${id}`)
    } else {
      // collect
      await http.post(`/article/likings`, {
        target: id,
      })
    }
    dispatch({
      type: 'article/updateInfo',
      payload: {
        name: 'attitude',
        value: attitude === 1 ? 0 : 1,
      },
    })
    Toast.show({
      content: attitude === 1 ? '取消点赞' : '已点赞',
    })
  }
}
// get a article reviews-coverage data
export const getArticleComent = (type: string, id: string): RootThunkAction => {
  return async (dispatch) => {
    const res = await http.get<ArticleDetailResponse>('/comments', {
      params: {
        type,
        source: id,
      },
    })
    // console.log(res)
    dispatch({ type: 'article/getComment', payload: res.data.data })
  }
}
// get more article comment data - append data
export const getMoreArticleComments = (
  type: string,
  id: string,
  offset: string | null
): RootThunkAction => {
  return async (dispatch) => {
    const res = await http.get<ArticleDetailResponse>('/comments', {
      params: {
        type,
        source: id,
        offset,
      },
    })
    dispatch({ type: 'article/getCommentMore', payload: res.data.data })
  }
}
// comment on the article
export const addArticleComment = (
  target: string,
  content: string
): RootThunkAction => {
  return async (dispatch) => {
    const res = await http.post<AddArticleCommentResponse>('/comments', {
      target,
      content,
    })
    // console.log(res)
    dispatch({ type: 'article/addComment', payload: res.data.data.new_obj })
  }
}
// comments on the thumb up
export const likeComment = (
  art_id: string,
  is_liking: boolean
): RootThunkAction => {
  return async (dispatch) => {
    console.log(is_liking)

    if (is_liking) {
      // cancel the thumb up
      await http.delete(`/comment/likings/${art_id}`)
    } else {
      http.post('/comment/likings', {
        target: art_id,
      })
    }
    dispatch({
      type: 'comment/updateInfo',
      payload: {
        name: 'is_liking',
        value: !is_liking,
        target: art_id,
        like_count: is_liking ? -1 : 1,
      },
    })
    Toast.show({
      content: is_liking ? '取消点赞' : '已点赞',
    })
  }
}
// modify the number of replies
export const updateCommentCount = (
  commentId: string,
  total: number
): RootThunkAction => {
  return (disatch) => {
    disatch({
      type: 'comment/updateCommentCount',
      payload: {
        commentId,
        total,
      },
    })
  }
}
