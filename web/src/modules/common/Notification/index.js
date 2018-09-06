// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// UI Imports
import { Message } from 'semantic-ui-react'

// App Imports
import { messageHide } from '../api/actions'

// Component
class Notification extends PureComponent {
  render() {
    const { common: { message: { open, success, message } }, messageHide } = this.props

    return (
      open &&
      <Message floating onClick={messageHide} style={{ position: 'fixed', bottom: 0, left: 0, margin: '2em' }}>
        <Message.Header>{ success ? '✅ Success' : '❌ Error' }</Message.Header>
        <p>{ message }</p>
      </Message>
    )
  }
}

// Component Properties
Notification.propTypes = {
  common: PropTypes.object.isRequired,
  messageHide: PropTypes.func.isRequired
}

// Component State
function notificationState(state) {
  return {
    common: state.common
  }
}

export default connect(notificationState, { messageHide })(Notification)
