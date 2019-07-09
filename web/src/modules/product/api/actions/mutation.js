// Imports
import axios from 'axios'

// App Imports
import { URL_API } from '../../../../setup/config/env'

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
    return axios.post(URL_API, {
      operation: 'productCreate',
      params: product
    })
  }
}

// Update
export function update(product) {
  return dispatch => {
    return axios.post(URL_API, {
      operation: 'productUpdate',
      params: product
    })
  }
}

// Remove
export function remove(productId) {
  return dispatch => {
    return axios.post(URL_API, {
      operation: 'productRemove',
      params: {
        productId
      }
    })
  }
}
