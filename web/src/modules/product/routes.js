// App Imports
import List from './List'
import CreateOrEdit from './CreateOrEdit'
import View from './View'

// Pages routes
export default {
  productList: {
    path: '/products',
    component: List
  },

  productCreate: {
    path: '/product/create',
    component: CreateOrEdit
  },

  productEdit: {
    path: (productId = ':productId') => (`/product/edit/${ productId }`),
    component: CreateOrEdit
  },

  productView: {
    path: (productId = ':productId') => (`/product/${ productId }`),
    component: View
  }
}
