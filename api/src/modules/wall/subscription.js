// App Imports
import Wall from './model'

// Get all
export async function wallSubscribeList(s) {
  try {
    s.on('wallSubscribeList', message => {
      console.log(message)

      // socket.emit('wallSubscribeList', message)
    })
  } catch (error) {
    throw new Error('Unable to perform this operation. Please try again.')
  }
}
