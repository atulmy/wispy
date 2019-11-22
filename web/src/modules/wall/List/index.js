// Imports
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useImmer } from 'use-immer'
import moment from 'moment'

// UI Imports
import { Header, Table, Loader, Divider, Grid } from 'semantic-ui-react'

// App Imports
import subscription from '../../../setup/config/subscription'
import { messageShow } from '../../common/api/actions'
import { getList } from '../api/actions/query'
import Create from '../Create'

// Component
const List = () => {
  // state
  const [isRefreshing, isRefreshingToggle] = useState(false)
  const [list, setList] = useImmer([])
  const dispatch = useDispatch()

  // on component load
  useEffect(() => {
    refresh()

    subscribe()
  }, [])

  // refresh
  const refresh = async () => {
    isRefreshingToggle(true)

    try {
      const { data } = await getList()

      if(data.success) {
        setList(list => (list = data.data))
      }
    } catch(error) {
      dispatch(messageShow({
        success: false,
        message: 'There was some error. Please try again.'
      }))
    } finally {
      isRefreshingToggle(false)
    }
  }

  const subscribe = () => {
    subscription.on('wallSubscribeList', message => {
      setList(list => (list = [message, ...list]))
    })
  }

  // render
  return (
    <div>
      <Header as='h3'>
        Wall
      </Header>

      <Divider />

      <Grid>
        <Grid.Row>
          <Grid.Column width={6}>
            <Create />
          </Grid.Column>

          <Grid.Column width={10}>
            <Table celled>
              <Table.Body>
                {
                  isRefreshing
                    ? <Table.Row>
                      <Table.Cell colSpan={2} style={{ textAlign: 'center' }}>
                        <Loader active inline />
                      </Table.Cell>
                    </Table.Row>
                    : list.length > 0
                      ? list.map(wall =>
                          <Table.Row key={wall._id}>
                            <Table.Cell>{ wall.message }</Table.Cell>
                            <Table.Cell>{ moment(wall.createdAt).fromNow() }</Table.Cell>
                          </Table.Row>
                        )
                      : <Table.Row style={{ textAlign: 'center' }}>
                          <Table.Cell colSpan={2}>No data to show.</Table.Cell>
                        </Table.Row>
                }
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default List
