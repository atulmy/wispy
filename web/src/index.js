// Imports
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as StateProvider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import isFunction from 'lodash/isFunction'

// UI Imports
import 'semantic-ui-css/semantic.min.css'

// App Imports
import { store } from './setup/store'
import routes from './setup/routes'
import Layout from './modules/common/Layout'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <StateProvider store={store}>
    <Router>
      <Layout>
        <Switch>
          {
            Object.values(routes).map((route, index) => (
              <Route
                {...route}
                key={index}
                path={isFunction(route.path) ? route.path() : route.path}
              />
            ))
          }
        </Switch>
      </Layout>
    </Router>
  </StateProvider>,
  document.getElementById('root')
)

registerServiceWorker()
