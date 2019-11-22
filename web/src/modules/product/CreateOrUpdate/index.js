// Imports
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

// UI Imports
import { Header, Grid, Divider, Button, Form, Loader } from 'semantic-ui-react'

// App Imports
import { messageShow } from '../../common/api/actions'
import routes from '../api/routes'
import { get } from '../api/actions/query'
import { createOrUpdate } from '../api/actions/mutation'

// Component
const CreateOrUpdate = ({ match: { params: { productId } }, history }) => {
  // state
  const [isRefreshing, isRefreshingToggle] = useState(false)
  const [isSubmitting, isSubmittingToggle] = useState(false)
  const [product, setProduct] = useState({
    _id: '',
    name: '',
    description: ''
  })
  const dispatch = useDispatch()

  // on component load
  useEffect(() => {
    if(productId) {
      refresh(productId)
    }
  }, [productId])

  // refresh
  const refresh = async productId => {
    isRefreshingToggle(true)

    try {
      const { data } = await get(productId)

      if(data.success) {
        setProduct(data.data)
      }
    } catch(error) {
      dispatch(messageShow({ title: 'Error!', description: 'There was some error. Please try again.' }))
    } finally {
      isRefreshingToggle(false)
    }
  }

  // on submit
  const onSubmit = async event => {
    event.preventDefault()

    isSubmittingToggle(true)

    try {
      const { data } = await createOrUpdate(product)

      dispatch(messageShow({ success: data.success, message: data.message }))

      if(data.success) {
        history.push(routes.productList.path)
      } else {
        isSubmittingToggle(false)
      }
    } catch(error) {
      isSubmittingToggle(false)

      dispatch(messageShow({ success: false, message: 'There was some error. Please try again.' }))
    }
  }

  // on change
  const onChange = event => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value
    })
  }

  // render
  return (
    <div>
      <Header as='h3'>{ productId ? 'Edit' : 'Create' } Product</Header>

      <Divider />

      <Grid>
        <Grid.Row>
          <Grid.Column width={8}>
            {
              isRefreshing
                ? <Loader active inline />
                : <Form onSubmit={onSubmit}>
                    <Form.Field>
                      <label>Name</label>

                      <Form.Input
                        name='name'
                        value={product.name}
                        onChange={onChange}
                        placeholder='Enter product name'
                        required
                        autoFocus
                      />
                    </Form.Field>

                    <Form.Field>
                      <label>Description</label>

                      <Form.Input
                        name='description'
                        value={product.description}
                        onChange={onChange}
                        placeholder='Enter product description'
                      />
                    </Form.Field>

                    <Button
                      primary
                      type='submit'
                      loading={isSubmitting}
                      disabled={isSubmitting}
                    >
                      Submit
                    </Button>
                  </Form>
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}


export default CreateOrUpdate
