// Imports
import React, { PureComponent } from 'react'

// UI Imports
import { Menu } from 'semantic-ui-react'

// App Imports

// Component
class Header extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      activeItem: ''
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu>
        <Menu.Item name='browse' active={activeItem === 'browse'} onClick={this.handleItemClick}>
          Browse
        </Menu.Item>

        <Menu.Item name='submit' active={activeItem === 'submit'} onClick={this.handleItemClick}>
          Submit
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item name='signup' active={activeItem === 'signup'} onClick={this.handleItemClick}>
            Sign Up
          </Menu.Item>

          <Menu.Item name='help' active={activeItem === 'help'} onClick={this.handleItemClick}>
            Help
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

export default Header
