// Imports
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'

// App Imports
import { NODE_ENV, WEB_URL } from '../config/env'

// Setup middlewares
export default function (app) {
  console.info('SETUP - Middlewares..')

  // Enable CORS
  app.use(cors({
    origin: WEB_URL
  }))

  // Request body parser
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  // HTTP logger
  if(NODE_ENV === 'development') {
    app.use(morgan('tiny'))
  }
}
