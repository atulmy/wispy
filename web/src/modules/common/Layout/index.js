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
    <main>
      { props.children }
    </main>
  </div>
)

export default Layout
