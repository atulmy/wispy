// App Imports
import Product from './model'

// Create
export async function productCreate({ name, description = '' }) {
  try {
    const data = await Product.create({ name, description })

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

// Create
export async function productUpdate({ _id, name, description = '' }) {
  try {
    const data = await Product.updateOne({ _id }, { name, description })

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
