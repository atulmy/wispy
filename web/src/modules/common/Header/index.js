// Imports
import React from 'react'
import { Link } from 'react-router-dom'

// UI Imports
import { Menu } from 'semantic-ui-react'

// App Imports
import routes from '../../../setup/routes'

// Component
export const Header = () => (
  <Menu>
    <Link to={routes.home.path}>
      <Menu.Item>
        <strong>WISPY</strong>
      </Menu.Item>
    </Link>

    <Link to={routes.productList.path}>
      <Menu.Item>
        Products
      </Menu.Item>
    </Link>

    <Link to={routes.wallList.path}>
      <Menu.Item>
        Wall
      </Menu.Item>
    </Link>

    <Menu.Menu position={'right'}>
      <Link to={routes.about.path}>
        <Menu.Item>
          About
        </Menu.Item>
      </Link>

      <a href={'https://github.com/atulmy/wispy'} target={'_blank'}>
        <Menu.Item>
          GitHub
        </Menu.Item>
      </a>
    </Menu.Menu>
  </Menu>
)

export default Header
