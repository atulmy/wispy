// Imports
import React, { Component } from 'react'
import { connect } from 'react-redux'

// UI Imports
import { Button, Form } from 'semantic-ui-react'

// App Imports
import { messageShow } from '../../common/api/actions'
import { create } from '../api/actions/mutation'

// Component
class Create extends Component {

  constructor (props) {
    super(props)

    this.wall = {
      message: ''
    }

    this.state = {
      isLoadingSubmit: false,

      wall: { ...this.wall }
    }
  }

  onSubmit = async (event) => {
    event.preventDefault()

    const { dispatch } = this.props
    const { wall } = this.state

    this.isLoadingSubmitToggle(true)

    try {
      const { data } = await dispatch(create(wall))

      dispatch(messageShow({
        success: data.success,
        message: data.message
      }))

      if(data.success) {
        this.setState({
          wall: { ...this.wall }
        })
      }
    } catch(error) {
      dispatch(messageShow({
        success: false,
        message: 'There was some error. Please try again.'
      }))
    } finally {
      this.isLoadingSubmitToggle(false)
    }
  }

  isLoadingSubmitToggle = isLoadingSubmit => {
    this.setState({
      isLoadingSubmit
    })
  }

  onChange = (event, { name, value }) => {
    let { wall } = this.state
    wall[name] = value

    this.setState({
      wall
    })
  }

  render() {
    const { isLoadingSubmit, wall: { message } } = this.state

    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field>
          <Form.Input
            name={'message'}
            value={message}
            onChange={this.onChange}
            placeholder={'Post something on the wall'}
            autoComplete={'off'}
            required
            autoFocus
          />
        </Form.Field>

        <Button primary type={'submit'} loading={isLoadingSubmit}>Post</Button>
      </Form>
    )
  }
}

export default connect()(Create)
