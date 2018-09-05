// App Imports
import { LIST_REQUEST, LIST_RESPONSE, LIST_DONE, LIST_RESET } from './actions/types'

// List

// Initial State
const productsInitialState = {
  isLoading: false,
  list: {}
}

// State
export const products = (state = productsInitialState, action) => {
  switch (action.type) {
    case LIST_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading
      }

    case LIST_RESPONSE:
      return {
        ...state,
        list: action.list
      }

    case LIST_DONE:
      return {
        ...state,
        isLoading: false
      }

    case LIST_RESET:
      return { ...productsInitialState }

    default:
      return state
  }
}

