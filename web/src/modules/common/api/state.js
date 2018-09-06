// App Imports
import { MESSAGE_SHOW, MESSAGE_HIDE } from './actions'

// Initial State
export const commonInitialState = {
  message: {
    title: '',
    description: '',
    open: false
  }
}

// State
export default (state = commonInitialState, action) => {
  switch (action.type) {
    case MESSAGE_SHOW:
      return {
        ...state,
        message: {
          title: action.title,
          description: action.description || '',
          open: true
        }
      }

    case MESSAGE_HIDE:
      return {
        ...state,
        ...commonInitialState
      }

    default:
      return state
  }
}
