// Imports
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// UI Imports
import { Message } from 'semantic-ui-react'

// App Imports
import { messageHide } from '../api/actions'

// Component
const Notification = () => {
  // state
  const { message: { open, success, message } } = useSelector(state => state.common)
  const dispatch = useDispatch()

  // render
  return (
    open &&
    <Message
      onClick={() => dispatch(messageHide())}
      style={{ position: 'fixed', bottom: 0, left: 0, margin: '2em' }}
      floating
    >
      <Message.Header>{ success ? '✅ Success' : '❌ Error' }</Message.Header>

      <p>{ message }</p>
    </Message>
  )
}

export default Notification
