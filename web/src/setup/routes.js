// App Imports
import pages from '../modules/pages/api/routes'
import product from '../modules/product/api/routes'
import wall from '../modules/wall/api/routes'

// Combined routes
const routes = {
  ...pages,
  ...product,
  ...wall,
}

export default routes
