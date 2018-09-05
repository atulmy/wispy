// Imports
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'

// App Imports
import { NODE_ENV, WEB_URL } from '../config/env'

// Setup middlewares
export default function (server) {
  console.info('SETUP - Middlewares..')

  // Enable CORS
  server.use(cors({
    origin: WEB_URL
  }))

  // Request body parser
  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({ extended: false }))

  // HTTP logger
  if(NODE_ENV === 'development') {
    server.use(morgan('tiny'))
  }
}
