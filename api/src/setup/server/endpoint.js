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
      success: false
    }

    if(NODE_ENV === 'development') {
      console.log(request.body)
    }

    try {
      result = await modules[request.body.operation](request.body.params)
    } catch (error) {
      console.error(error.message)
    }

    response.send(result)
  })
}
