// App Imports
import List from './List'
import CreateOrEdit from './CreateOrEdit'

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
  }
}
