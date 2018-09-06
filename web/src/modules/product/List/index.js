// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// UI Imports
import { Header, Table, Loader, Button, Divider } from 'semantic-ui-react'

// App Imports
import { messageShow } from '../../common/api/actions'
import routes from '../api/routes'
import { getList } from '../api/actions/query'
import { remove } from '../api/actions/mutation'

// Component
class List extends PureComponent {
  componentDidMount() {
    this.refresh()
  }

  refresh = (isLoading = true) => {
    const { getList } = this.props

    getList(isLoading)
  }

  onDelete = (productId) => async () => {
    const { remove, messageShow } = this.props

    let check = window.confirm('Are you sure you want to delete this product?')

    if(check) {
      try {
        const { data } = await remove(productId)

        if(data.success) {
          this.refresh(false)
        }

        messageShow({ success: data.success, message: data.message })
      } catch(error) {
        messageShow({ success: false, message: 'There was some error. Please try again.' })
      }
    }
  }

  render() {
    const { products: { isLoading, list } } = this.props

    return (
      <div>
        <Header as={'h3'} style={{ marginBottom: '1.5em' }}>
          Products

          <div style={{ float: 'right' }}>
            <Link to={routes.productCreate.path}>
              <Button>Add</Button>
            </Link>
          </div>
        </Header>

        <Divider />

        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>

              <Table.HeaderCell>Description</Table.HeaderCell>

              <Table.HeaderCell style={{ textAlign: 'center', width: 260}}>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              isLoading
                ? <Table.Row>
                    <Table.Cell colSpan={3} style={{ textAlign: 'center' }}>
                      <Loader active inline />
                    </Table.Cell>
                  </Table.Row>
                : list.length > 0
                  ? list.map(({ _id, name, description }, i) =>
                      <Table.Row key={_id}>
                        <Table.Cell>{ name }</Table.Cell>

                        <Table.Cell>{ description }</Table.Cell>

                        <Table.Cell style={{ textAlign: 'center' }}>
                          <Link to={routes.productView.path(_id)}>
                            <Button>View</Button>
                          </Link>

                          <Link to={routes.productEdit.path(_id)}>
                            <Button>Edit</Button>
                          </Link>

                          <Button onClick={this.onDelete(_id)}>Delete</Button>
                        </Table.Cell>
                      </Table.Row>
                    )
                  : <Table.Row style={{ textAlign: 'center' }}>
                      <Table.Cell colSpan={3}>No data to show.</Table.Cell>
                    </Table.Row>
            }
          </Table.Body>
        </Table>
      </div>
    )
  }
}

// Component Properties
List.propTypes = {
  products: PropTypes.object.isRequired,
  getList: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired,
}

// Component State
function listState(state) {
  return {
    products: state.products
  }
}

export default connect(listState, { getList, remove, messageShow })(List)
