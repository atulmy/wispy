// Imports
import http from 'http'
import express from 'express'

// App Imports
import database from './setup/server/database'
import middlewares from './setup/server/middlewares'
import endpoint from './setup/server/endpoint'
import start from './setup/server/start'

// Create express server
const app = express()
const server = http.createServer(app)

// Connect database
database()

// Setup middleware
middlewares(app)

// Setup endpoint
endpoint(app, server)

// Start server
start(server)
