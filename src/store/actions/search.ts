import { SearchSuggestionResponse } from '@/types/data'
import { RootThunkAction } from '@/types/store'
import { http } from '@/utils'

// get search suggestions
export const getSuggestion = (value: string): RootThunkAction => {
  return async (dispatch) => {
    const res = await http.get<SearchSuggestionResponse>('/suggestion', {
      params: {
        q: value,
      },
    })
    // console.log(res.data.data.options)
    dispatch({ type: 'search/suggestion', payload: res.data.data.options })
  }
}
// clear associative keywords
export const clearSuggestion = (): RootThunkAction => {
  return (dispatch) => {
    dispatch({ type: 'search/clearSuggestion' })
  }
}
