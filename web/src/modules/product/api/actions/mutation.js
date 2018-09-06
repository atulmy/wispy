// Imports
import axios from 'axios'

// App Imports
import { API_URL } from '../../../../setup/config/env'

// Create or update
export function createOrUpdate(product) {
  if (product._id) {
    return update(product)
  } else {
    return create(product)
  }
}

// Create
export function create(product) {
  return dispatch => {
    return axios.post(API_URL, {
      operation: 'productCreate',
      params: product
    })
  }
}

// Update
export function update(product) {
  return dispatch => {
    return axios.post(API_URL, {
      operation: 'productUpdate',
      params: product
    })
  }
}

// Remove
export function remove(data) {
  return dispatch => {
    return axios.post(API_URL, {
      operation: 'productRemove',
      params: data
    })
  }
}
