// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// UI Imports
import { Header, Table, Loader, Button } from 'semantic-ui-react'

// App Imports
import routes from '../routes'
import { getList } from '../api/actions/query'

// Component
class List extends PureComponent {
  componentDidMount() {
    const { getList } = this.props

    getList()
  }

  render() {
    const { products: { isLoading, list } } = this.props

    return (
      <div>
        <Header as={'h3'} style={{ marginBottom: '2em' }}>
          Products

          <div style={{ float: 'right' }}>
            <Link to={routes.productCreate.path}>
              <Button>Add</Button>
            </Link>
          </div>
        </Header>

        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>

              <Table.HeaderCell>Description</Table.HeaderCell>

              <Table.HeaderCell style={{ textAlign: 'center' }}>Actions</Table.HeaderCell>
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
                          <Link to={routes.productEdit.path(_id)}>
                            <Button>Edit</Button>
                          </Link>

                          <Button>Delete</Button>
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
}

// Component State
function listState(state) {
  return {
    products: state.products
  }
}

export default connect(listState, { getList })(List)
