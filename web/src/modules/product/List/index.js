// Imports
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

// UI Imports
import { Header, Table, Loader, Button, Divider } from 'semantic-ui-react'

// App Imports
import { messageShow } from '../../common/api/actions'
import routes from '../api/routes'
import { getList } from '../api/actions/query'
import { remove } from '../api/actions/mutation'

// Component
const List = () => {
  // state
  const { isLoading, list } = useSelector(state => state.products)
  const dispatch = useDispatch()

  // on component load
  useEffect(() => {
    refresh()
  }, [])

  // refresh
  const refresh = (isLoading = true) => {
    dispatch(getList(isLoading))
  }

  // on delete
  const onDelete = productId => async () => {
    let check = window.confirm('Are you sure you want to delete this product?')

    if(check) {
      try {
        const { data } = await remove(productId)

        if(data.success) {
          refresh(false)
        }

        dispatch(messageShow({ success: data.success, message: data.message }))
      } catch(error) {
        dispatch(messageShow({ success: false, message: 'There was some error. Please try again.' }))
      }
    }
  }

  // render
  return (
    <div>
      <Header as='h3' style={{ marginBottom: '1.5em' }}>
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
                  ? list.map(({ _id, name, description }) =>
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

                          <Button onClick={onDelete(_id)}>Delete</Button>
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

export default List
