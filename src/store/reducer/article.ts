import { ArticleDetail } from './../../types/data.d'
import { Articles } from '@/types/data'
import { ArticleAction } from '@/types/store'

type ArticleState = {
  channelArticles: {
    [key: number]: Articles
  }
  detail: ArticleDetail
}
const initialState: ArticleState = {
  channelArticles: {},
  detail: {} as ArticleDetail,
}
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
    default:
      return state
  }
}
