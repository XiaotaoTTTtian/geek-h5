import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from './reducer'
import { getToken } from '@/utils/token'

// setting the initial value
const initialState = {
  login: getToken(),
}
const middlewares = composeWithDevTools(applyMiddleware(thunk))
/**
 * @param rootReducer reducer
 * @param initialState original state
 * @param middlewares enhancers, such as middleware
 */
const store = createStore(rootReducer, initialState, middlewares)
export default store
