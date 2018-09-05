// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// UI Imports
import { Header, Loader, Table, Divider } from 'semantic-ui-react'

// App Imports
import { get } from '../api/actions/query'

// Component
class View extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: false,
      product: null
    }
  }

  componentDidMount() {
    this.refresh()
  }

  refresh = async () => {
    const { get, match: { params: { productId } } } = this.props

    try {
      const { data } = await get(productId)

      if(data.success) {
        this.setState({
          product: data.data
        })
      }
    } catch(error) {
      console.error(error)
    } finally {
      this.isLoadingToggle(false)
    }
  }

  isLoadingToggle = isLoading => {
    this.setState({
      isLoading
    })
  }

  render() {
    const { isLoading, product } = this.state

    return (
      <div>
        <Header as={'h3'}>View Product</Header>

        <Divider />

        {
          isLoading
            ? <Loader active inline />
            : product && product._id
              ? <div>
                  <Table basic={'very'} celled collapsing>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>
                          <strong>ID</strong>
                        </Table.Cell>

                        <Table.Cell>{ product._id }</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>
                          <strong>Name</strong>
                        </Table.Cell>

                        <Table.Cell>{ product.name }</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>
                          <strong>Description</strong>
                        </Table.Cell>

                        <Table.Cell>{ product.description }</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>
                          <strong>Created at</strong>
                        </Table.Cell>

                        <Table.Cell>{ product.createdAt }</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>
                          <strong>Updated at</strong>
                        </Table.Cell>

                        <Table.Cell>{ product.updatedAt }</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </div>
              : <p>Sorry no details to show.</p>
        }
      </div>
    )
  }
}

// Component Properties
View.propTypes = {
  get: PropTypes.func.isRequired,
}

export default connect(null, { get })(View)
