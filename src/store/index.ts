import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from './reducer'
const middlewares = composeWithDevTools(applyMiddleware(thunk))
const store = createStore(rootReducer, middlewares)
export default store
