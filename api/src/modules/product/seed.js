// App Imports
import { productCreate } from './mutation'

// Seeds
export default async function() {
  console.log('SEED - Product..')

  const products = [
    {
      name: 'The ship is proudly apocalyptic',
      description: 'Where is the solid crewmate? Dozens of patterns will be lost in x-ray visions like peaces in rumours.',
    },
    {
      name: 'The queen meets nuclear flux like an ordinary crew',
      description: 'It is a cold rumour, sir. Admiral of an interstellar wind, place the devastation! Wind, energy, and procedure.',
    }
  ]

  for (const product of products) {
    await productCreate({ params: product })
  }
}
