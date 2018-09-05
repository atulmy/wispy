// Imports
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

// App Imports
import common from '../modules/common/api/state'
import * as product from '../modules/product/api/state'

// Root Reducer
const rootReducer = combineReducers({
  common,
  ...product,
})

// Store
export const store = createStore(rootReducer, applyMiddleware(thunk))
