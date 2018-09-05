// Imports
import React from 'react'

// App Imports
import Header from '../Header'

// Component
const Layout = (props) => (
  <div>
    {/* Header */}
    <Header />

    {/* Body */}
    <main style={{ padding: '1em 2em' }}>
      { props.children }
    </main>
  </div>
)

export default Layout
