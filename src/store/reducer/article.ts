import { ArticleDetail } from './../../types/data.d'
import { Articles, ArticleComment } from '@/types/data'
import { ArticleAction } from '@/types/store'

type ArticleState = {
  channelArticles: {
    [key: number]: Articles
  }
  detail: ArticleDetail
  comment: ArticleComment
}
const initialState: ArticleState = {
  channelArticles: {},
  detail: {} as ArticleDetail,
  comment: {
    results: [] as ArticleComment['results'],
  },
} as ArticleState
export const article = (
  state = initialState,
  action: ArticleAction
): ArticleState => {
  switch (action.type) {
    // get article list
    case 'home/getArticleList':
      const curChannelArticle = state.channelArticles[
        action.payload.channelId
      ] ?? { pre_timestamp: null, results: [] }
      const {
        channelId,
        data: { pre_timestamp, results },
      } = action.payload
      return {
        ...state,
        channelArticles: {
          ...state.channelArticles,
          [channelId]: {
            pre_timestamp,
            results: [...curChannelArticle.results, ...results],
          },
        },
      }
    // get article detaile
    case 'article/get':
      return {
        ...state,
        detail: action.payload,
      }
    // update information
    case 'article/updateInfo':
      return {
        ...state,
        detail: {
          ...state.detail,
          [action.payload.name]: action.payload.value,
        },
      }
    // get article comment
    case 'article/getComment':
      return {
        ...state,
        comment: action.payload,
      }
    // additional comments
    case 'article/getCommentMore':
      return {
        ...state,
        comment: {
          ...action.payload,
          results: [...state.comment.results, ...action.payload.results],
        },
      }
    // post comments on articles
    case 'article/addComment':
      return {
        ...state,
        comment: {
          ...state.comment,
          total_count: state.comment.total_count + 1,
          results: [action.payload, ...state.comment.results],
        },
      }
    // comments on the thumb up
    case 'comment/updateInfo':
      return {
        ...state,
        comment: {
          ...state.comment,
          results: state.comment.results.map((item) => {
            if (item.com_id === action.payload.target) {
              return {
                ...item,
                [action.payload.name]: action.payload.value,
                like_count: item.like_count + action.payload.like_count,
              }
            }
            return item
          }),
        },
      }
    // modify the number of replies
    case 'comment/updateCommentCount':
      return {
        ...state,
        comment: {
          ...state.comment,
          results: state.comment.results.map((item) => {
            if (item.com_id === action.payload.commentId) {
              return {
                ...item,
                reply_count: action.payload.total,
              }
            }
            return item
          }),
        },
      }
    default:
      return state
  }
}
