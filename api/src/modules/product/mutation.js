// App Imports
import Product from './model'

// Create
export async function productCreate({ name, description = '' }) {
  try {
    return await Product.create({ name, description })
  } catch (error) {
    throw new Error('Sorry, unable to perform this action.')
  }
}
