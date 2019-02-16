// Imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// UI Imports
import { Header, Grid, Divider, Button, Form } from 'semantic-ui-react'

// App Imports
import { messageShow } from '../../common/api/actions'
import routes from '../api/routes'
import { get } from '../api/actions/query'
import { createOrUpdate } from '../api/actions/mutation'

// Component
class CreateOrUpdate extends Component {
  constructor (props) {
    super(props)

    this.product = {
      _id: '',
      name: '',
      description: ''
    }

    this.state = {
      isLoading: false,
      isLoadingSubmit: false,

      product: this.product
    }
  }

  componentDidMount() {
    const { match: { params: { productId } } } = this.props

    if(productId) {
      this.refresh(productId)
    }
  }

  refresh = async (productId) => {
    const { get } = this.props

    this.isLoadingToggle(true)

    try {
      const { data } = await get(productId)

      if(data.success) {
        this.setState({
          product: data.data
        })
      }
    } catch(error) {
      messageShow({ title: 'Error!', description: 'There was some error. Please try again.' })
    } finally {
      this.isLoadingToggle(false)
    }
  }

  onSubmit = async (event) => {
    event.preventDefault()

    const { createOrUpdate, messageShow, history } = this.props
    const { product } = this.state

    this.isLoadingSubmitToggle(true)

    try {
      const { data } = await createOrUpdate(product)

      if(data.success) {
        history.push(routes.productList.path)
      } else {
        this.isLoadingSubmitToggle(false)
      }

      messageShow({ success: data.success, message: data.message })
    } catch(error) {
      this.isLoadingSubmitToggle(false)

      messageShow({ success: false, message: 'There was some error. Please try again.' })
    }
  }

  isLoadingToggle = isLoading => {
    this.setState({
      isLoading
    })
  }

  isLoadingSubmitToggle = isLoadingSubmit => {
    this.setState({
      isLoadingSubmit
    })
  }

  onChange = (event, { name, value }) => {
    let { product } = this.state
    product[name] = value

    this.setState({
      product
    })
  }

  render() {
    const { match: { params: { productId } } } = this.props
    const { product: { name, description }, isLoading, isLoadingSubmit } = this.state

    return (
      <div>
        <Header as={'h3'}>{ productId ? 'Edit' : 'Create' } Product</Header>

        <Divider />

        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              <Form onSubmit={this.onSubmit}>
                <Form.Field>
                  <label>Name</label>

                  <Form.Input
                    name={'name'}
                    value={name}
                    onChange={this.onChange}
                    placeholder={'Enter product name'}
                    autoComplete={'off'}
                    required
                    autoFocus
                  />
                </Form.Field>

                <Form.Field>
                  <label>Description</label>

                  <Form.Input
                    name={'description'}
                    value={description}
                    onChange={this.onChange}
                    placeholder={'Enter product description'}
                    autoComplete={'off'}
                  />
                </Form.Field>

                <Button primary type={'submit'} loading={isLoadingSubmit || (productId && isLoading)} disabled={isLoadingSubmit || (productId && isLoading)}>Submit</Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

// Component Properties
CreateOrUpdate.propTypes = {
  get: PropTypes.func.isRequired,
  createOrUpdate: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired,
}

export default connect(null, { get, createOrUpdate, messageShow })(CreateOrUpdate)
