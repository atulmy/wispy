// App Imports
import Home from '../Home'
import About from '../About'

// Pages routes
export default {
  home: {
    path: '/',
    component: Home,
    exact: true
  },

  about: {
    path: '/about',
    component: About
  }
}
