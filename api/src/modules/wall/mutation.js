// App Imports
import Wall from './model'

// Create
export async function wallCreate({ params: { message }, subscription }) {
  if(message) {
    try {
      const data = await Wall.create({ message })

      subscription.emit('wallSubscribeList', data)

      return {
        data,
        message: 'Message posted on wall successfully.'
      }
    } catch (error) {
      throw new Error('Unable to perform this operation. Please try again.')
    }
  }

  throw new Error('Invalid wall information.')
}
