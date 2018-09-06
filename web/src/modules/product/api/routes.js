// App Imports
import List from '../List'
import CreateOrUpdate from '../CreateOrUpdate'
import View from '../View'

// Pages routes
export default {
  productList: {
    path: '/products',
    component: List
  },

  productCreate: {
    path: '/product/create',
    component: CreateOrUpdate
  },

  productEdit: {
    path: (productId = ':productId') => (`/product/edit/${ productId }`),
    component: CreateOrUpdate
  },

  productView: {
    path: (productId = ':productId') => (`/product/${ productId }`),
    component: View
  }
}
