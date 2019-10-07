// Imports
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

// UI Imports
import { Header, Table, Loader, Divider, Grid } from 'semantic-ui-react'

// App Imports
import subscription from '../../../setup/config/subscription'
import { messageShow } from '../../common/api/actions'
import { getList } from '../api/actions/query'
import Create from '../Create'

// Component
class List extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      list: []
    }
  }

  async componentDidMount() {
    await this.refresh()

    this.subscribe()
  }

  refresh = async () => {
    const { dispatch } = this.props

    this.isLoadingToggle(true)

    try {
      const { data } = await dispatch(getList())

      if(data.success) {
        this.setState({
          list: data.data
        })
      }
    } catch(error) {
      dispatch(messageShow({
        success: false,
        message: 'There was some error. Please try again.'
      }))
    } finally {
      this.isLoadingToggle(false)
    }
  }

  isLoadingToggle = isLoading => {
    this.setState({
      isLoading
    })
  }

  subscribe = () => {
    subscription.on('wallSubscribeList', message => {
      this.setState({ list: [message, ...this.state.list] })
    })
  }

  render() {
    const { isLoading, list } = this.state

    return (
      <div>
        <Header as={'h3'}>
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
                    isLoading
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
}

export default connect()(List)
