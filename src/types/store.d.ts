import { ArtComment } from '@/types/data'
import { ArticleDetail } from './data.d'
import { ThunkAction } from 'redux-thunk'
import store from '@/store'
import {
  Articles,
  Channel,
  SearchSuggestion,
  Token,
  User,
  UserProfile,
  SearchResult,
} from './data'
// redux specifies the state type of the application
export type RootState = ReturnType<typeof store.getState>
//  Create a type for thunk dispatch
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>
/**
 * @param void thunk the return type of an action
 * @param RootState redux indicates the state rootState
 * @param unknown additional parameters, not used, can be specified as unknown
 * @param RootAction non-thunk action, which are action in the form of objects
 */
export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>
// the type of all actions in the project
type RootAction =
  | LoginAction
  | UserAction
  | HomeAction
  | ArticleAction
  | SearchAction
export type LoginAction =
  | {
      type: 'login/token'
      payload: Token
    }
  | { type: 'login/getCode' }
  | { type: 'login/logout' }

export type UserAction =
  | { type: 'user/getInformation'; payload: User }
  | { type: 'user/getProfile'; payload: UserProfile }
  | { type: 'user/update'; payload: object }

export type HomeAction =
  | {
      type: `home/${'getChannels' | 'getRestChannel'}`
      payload: Channel[]
    }
  | {
      type: 'home/ClickHighlighting'
      payload: number
    }
  | {
      type: `home/${'deleteChannel' | 'addChannel'}`
      payload: Channel
    }
export type ArticleAction =
  | {
      type: 'home/getArticleList'
      payload: {
        channelId: number
        data: Articles
      }
    }
  | {
      type: 'article/get'
      payload: ArticleDetail
    }
  | {
      type: 'article/updateInfo'
      payload: {
        name: 'is_followed' | 'is_collected' | 'attitude'
        value: boolean | number
      }
    }
  | {
      type: `article/${'getComment' | 'getCommentMore'}`
      payload: ArticleComment
    }
  | {
      type: 'article/addComment'
      payload: ArtComment
    }
  | {
      type: 'comment/updateInfo'
      payload: {
        name: string
        value: boolean
        target: string
        like_count: number
      }
    }
  | {
      type: 'comment/updateCommentCount'
      payload: {
        commentId: string
        total: number
      }
    }
export type SearchAction =
  | {
      type: 'search/suggestion'
      payload: SearchSuggestion['options']
    }
  | {
      type: 'search/clearSuggestion'
    }
  | {
      type: 'search/getSearchResult'
      payload: SearchResult
    }
