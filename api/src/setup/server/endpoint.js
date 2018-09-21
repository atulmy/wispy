// App Imports
import { NODE_ENV } from '../config/env'
import params from '../config/params'
import authentication from './authentication'
import modules from './modules'

// Setup endpoint
export default function (server) {
  console.info('SETUP - Endpoint..')

  // API endpoint
  server.all(params.endpoint.url, authentication, async (request, response) => {
    let result = {
      success: false,
      message: 'Please try again.',
      data: null
    }

    if(request.body.operation) {
      try {
        // Execute operation
        // operationName({ params, fields, auth })
        const { data, message = '' } = await modules[request.body.operation]({
          params: request.body.params || {},
          fields: request.body.fields || {},
          auth: request.auth,
        })

        // Operation executed successfully
        result.success = true
        result.data = data
        result.message = message
      } catch (error) {
        // Operation executed failed
        result.message = modules[request.body.operation] === undefined
          ? `${ request.body.operation } operation is not available.`
          : error.message
      }
    }

    if(NODE_ENV === 'development') {
      console.log(request.body)
      console.log(result)
    }

    response.send(result)
  })
}
