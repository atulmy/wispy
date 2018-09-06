// Imports
import React from 'react'

// App Imports
import Header from '../Header'
import Notification from '../Notification'

// Component
const Layout = (props) => (
  <div>
    {/* Header */}
    <Header />

    {/* Body */}
    <main style={{ padding: '1em 2em' }}>
      { props.children }
    </main>

    {/* Notification */}
    <Notification />
  </div>
)

export default Layout
