// App Imports
import Product from './model'

// Get all
export async function productList() {
  try {
    const data = await Product.find().sort({ createdAt: -1 })

    return {
      data
    }
  } catch (error) {
    throw new Error('Unable to perform this operation. Please try again.')
  }
}

// Get by id
export async function productById({ productId }) {
  try {
    const data = await Product.findById(productId)

    return {
      data
    }
  } catch (error) {
    throw new Error('Unable to perform this operation. Please try again.')
  }
}
