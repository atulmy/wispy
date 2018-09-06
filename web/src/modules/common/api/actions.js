// App Imports
import params from '../../../setup/config/params'

// Actions Types
export const MESSAGE_SHOW = 'COMMON_MESSAGE_SHOW'
export const MESSAGE_HIDE = 'COMMON_MESSAGE_HIDE'

export function messageShow({ title, description }, hide = params.message.timers.default) {
  return dispatch => {
    window.setTimeout(() => {
      dispatch({ type: MESSAGE_HIDE })
    }, hide)

    dispatch({ type: MESSAGE_SHOW, title, description })
  }
}

export function messageHide() {
  return { type: MESSAGE_HIDE }
}
