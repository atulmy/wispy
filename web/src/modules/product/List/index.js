// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// UI Imports
import { Header, Table, Loader } from 'semantic-ui-react'

// App Imports
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
        <Header as={'h3'}>Products</Header>

        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              isLoading
                ? <Table.Row>
                    <Table.Cell colSpan={2}>
                      <Loader />
                    </Table.Cell>
                  </Table.Row>
                : list.length > 0
                  ? list.map(({ _id, name, description }, i) =>
                      <Table.Row key={_id}>
                        <Table.Cell>{ name }</Table.Cell>
                        <Table.Cell>{ description }</Table.Cell>
                      </Table.Row>
                    )
                  : <Table.Row>
                      <Table.Cell colSpan={2}>No data to show.</Table.Cell>
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
