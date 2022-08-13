import { Articles } from '@/types/data'
import { ArticleAction } from '@/types/store'

type ArticleState = {
  channelArticles: {
    [key: number]: Articles
  }
}
const initialState: ArticleState = {
  channelArticles: {},
}
export const article = (
  state = initialState,
  action: ArticleAction
): ArticleState => {
  switch (action.type) {
    // login request token
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
    default:
      return state
  }
}
