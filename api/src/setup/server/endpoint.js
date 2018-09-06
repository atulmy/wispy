// App Imports
import { NODE_ENV } from '../config/env'
import params from '../config/params'
import modules from './modules'

// Setup endpoint
export default function (server) {
  console.info('SETUP - Endpoint..')

  // API endpoint
  server.all(params.endpoint.url, async (request, response) => {
    let result = {
      success: false,
      message: 'Please try again.',
      data: null
    }

    try {
      const { data, message = '' } = await modules[request.body.operation](request.body.params)
      result.success = true
      result.data = data
      result.message = message
    } catch (error) {
      result.message = error.message
    }

    if(NODE_ENV === 'development') {
      console.log(request.body)

      console.log(result.success)
    }

    response.send(result)
  })
}
