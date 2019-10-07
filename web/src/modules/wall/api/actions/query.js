// Imports
import axios from 'axios'

// App Imports
import { URL_API } from '../../../../setup/config/env'

// Get list
export function getList() {
  return async dispatch => {
    return await axios.post(URL_API, {
      operation: 'wallList',
      fields: ['_id', 'message', 'createdAt']
    })
  }
}
