// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

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
        <h1>Products</h1>

        {
          isLoading
            ? <p>Loading...</p>
            : list.length > 0
              ? <ul>
                  {
                    list.map(({ name, description }, i) =>
                      <li key={i}>
                        { name } - { description }
                      </li>
                    )
                  }
                </ul>
              : <p>No data to show.</p>
        }
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
