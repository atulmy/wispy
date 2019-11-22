// Imports
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

// UI Imports
import { Header, Loader, Table, Divider } from 'semantic-ui-react'

// App Imports
import { messageShow } from '../../common/api/actions'
import { get } from '../api/actions/query'

// Component
const View = ({ match: { params: { productId } } }) => {
  // state
  const [isRefreshing, isRefreshingToggle] = useState(false)
  const [product, setProduct] = useState(null)
  const dispatch = useDispatch()

  // on component load
  useEffect(() => {
    refresh()
  }, [productId])

  // refresh
  const refresh = async () => {
    isRefreshingToggle(true)

    try {
      const { data } = await get(productId)

      if(data.success) {
        setProduct(data.data)
      }
    } catch(error) {
      dispatch(messageShow({ success: false, message: 'There was some error. Please try again.' }))
    } finally {
      isRefreshingToggle(false)
    }
  }

  // render
  return (
    <div>
      <Header as='h3'>View Product</Header>

      <Divider />

      {
        isRefreshing
          ? <Loader active inline />
          : product && product._id
            ? <div>
                <Table basic='very' celled collapsing>
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

export default View
