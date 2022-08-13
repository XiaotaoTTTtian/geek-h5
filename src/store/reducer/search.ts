import { SearchSuggestion } from '@/types/data'
import { SearchAction } from '@/types/store'

type SearchState = {
  suggestion: SearchSuggestion['options']
}
const initialState: SearchState = {
  suggestion: [],
}
export const search = (
  state = initialState,
  action: SearchAction
): SearchState => {
  switch (action.type) {
    // get search suggestions
    case 'search/suggestion':
      return {
        ...state,
        suggestion: action.payload,
      }
    case 'search/clearSuggestion':
      return initialState
    default:
      return state
  }
}
