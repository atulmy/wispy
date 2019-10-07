// Imports
import axios from 'axios'

// App Imports
import { URL_API } from '../../../../setup/config/env'

// Create
export function create(wall) {
  return dispatch => {
    return axios.post(URL_API, {
      operation: 'wallCreate',
      params: wall
    })
  }
}
