// App Imports
import Product from './model'

// Get all
export async function productList() {
  try {
    const data = await Product.find()

    return {
      success: true,
      data
    }
  } catch (error) {
    return {
      success: false
    }
  }
}
