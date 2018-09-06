// App Imports
import pages from '../modules/pages/api/routes'
import product from '../modules/product/api/routes'

// Combined routes
const routes = {
  ...pages,
  ...product,
}

export default routes
