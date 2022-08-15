import { SearchSuggestion, SearchResult } from '@/types/data'
import { SearchAction } from '@/types/store'

type SearchState = {
  suggestion: SearchSuggestion['options']
  searchResults: SearchResult
}
const initialState: SearchState = {
  suggestion: [],
  searchResults: {} as SearchResult,
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
    // clean up search suggestions
    case 'search/clearSuggestion':
      return initialState
    // get search result
    case 'search/getSearchResult':
      return {
        ...state,
        searchResults: action.payload,
      }
    default:
      return state
  }
}
