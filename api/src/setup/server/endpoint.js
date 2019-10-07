// Imports
import socket from 'socket.io'

// App Imports
import { NODE_ENV } from '../config/env'
import params from '../config/params'
import authentication from './authentication'
import modules from './modules'

// Setup endpoint
export default function (app, server) {
  console.info('SETUP - Endpoint..')

  // Websocket
  const io = socket.listen(server)
  const subscription = io.of('subscription')

  // API endpoint
  app.all(params.endpoint.mode === 'rpc' ? '/' : '/:operation?', authentication, async (request, response) => {
    let result = {
      success: false,
      message: 'Please try again.',
      data: null
    }

    let operation

    switch (params.endpoint.mode) {
      case 'composite':
        operation = modules[request.body.operation] || modules[request.params.operation]
        break

      case 'rest':
        operation = modules[request.params.operation]
        break

      case 'rpc':
      default:
        operation = modules[request.body.operation]
        break
    }

    if(operation) {
      try {
        // Execute operation
        // operationName({ params, fields, auth })
        const { data, message = '' } = await operation({
          params: request.body.params || request.query || {},
          fields: request.body.fields || {},
          auth: request.auth,
          subscription
        })

        // Operation executed successfully
        result.success = true
        result.data = data
        result.message = message
      } catch (error) {
        // Operation executed failed
        result.message = error.message
      }
    } else {
      result.message = `${ request.body.operation } operation is not available.`
    }

    if(NODE_ENV === 'development') {
      console.log(request.body)
      console.log(result)
    }

    response.send(result)
  })
}
