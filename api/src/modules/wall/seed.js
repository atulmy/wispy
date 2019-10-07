// App Imports
import { wallCreate } from './mutation'

// Seeds
export default async function() {
  console.log('SEED - Wall..')

  const messages = [
    {
      message: 'I need help with coding.'
    },
    {
      message: 'I can help with design.',
    }
  ]

  for (const message of messages) {
    await wallCreate({ params: message })
  }
}
