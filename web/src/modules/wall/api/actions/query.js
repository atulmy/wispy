// Imports
import axios from 'axios'

// App Imports
import { URL_API } from '../../../../setup/config/env'

// Get list
export function getList() {
  return axios.post(URL_API, {
    operation: 'wallList',
    fields: ['_id', 'message', 'createdAt']
  })
}
