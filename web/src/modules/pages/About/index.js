// Imports
import React from 'react'

// UI Imports
import { Divider, Header } from 'semantic-ui-react'

// Component
const About = () => (
  <div>
    <Header as={'h3'}>About Wispy</Header>

    <Divider />

    <p><span role="img" aria-label="wispy">🌱</span>An experimental lightweight RPC (remote procedure call) API pattern inspired by GraphQL/SOAP.</p>
  </div>
)

export default About
