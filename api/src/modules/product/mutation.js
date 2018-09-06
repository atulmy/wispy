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

// Update
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

// Remove
export async function productRemove({ productId }) {
  try {
    const data = await Product.deleteOne({ _id: productId })

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
