// Imports
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

// UI Imports
import { Button, Form } from 'semantic-ui-react'

// App Imports
import { messageShow } from '../../common/api/actions'
import { create } from '../api/actions/mutation'

// Component
const Create = () => {
  // state
  const [isSubmitting, isSubmittingToggle] = useState(false)
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()

  // on submit
  const onSubmit = async (event) => {
    event.preventDefault()

    isSubmittingToggle(true)

    try {
      const { data } = await dispatch(create({ message }))

      dispatch(messageShow({
        success: data.success,
        message: data.message
      }))

      if(data.success) {
        setMessage('')
      }
    } catch(error) {
      dispatch(messageShow({
        success: false,
        message: 'There was some error. Please try again.'
      }))
    } finally {
      isSubmittingToggle(false)
    }
  }

  // on change
  const onChange = event => {
    setMessage(event.target.value)
  }

  // render
  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Form.Input
          name='message'
          value={message}
          onChange={onChange}
          placeholder='Post something on the wall'
          autoComplete='off'
          required
          autoFocus
        />
      </Form.Field>

      <Button
        type='submit'
        loading={isSubmitting}
        disabled={isSubmitting}
        primary
      >
        Post
      </Button>
    </Form>
  )
}

export default Create
