// App Imports
import Product from './model'

// Create
export async function productCreate({ name, description = '' }) {
  if(name) {
    try {
      const data = await Product.create({ name, description })

      return {
        data,
        message: 'Product created successfully.'
      }
    } catch (error) {
      throw new Error('Unable to perform this operation. Please try again.')
    }
  }

  throw new Error('Invalid product information.')
}

// Update
export async function productUpdate({ _id, name, description = '' }) {
  if(_id && name) {
    try {
      const data = await Product.updateOne({ _id }, { name, description })

      return {
        data,
        message: 'Product updated successfully.'
      }
    } catch (error) {
      throw new Error('Unable to perform this operation. Please try again.')
    }
  }

  throw new Error('Invalid product information.')
}

// Remove
export async function productRemove({ productId }) {
  if(productId) {
    try {
      const data = await Product.deleteOne({ _id: productId })

      return {
        data,
        message: 'Product removed successfully.'
      }
    } catch (error) {
      throw new Error('Unable to perform this operation. Please try again.')
    }
  }

  throw new Error('Invalid product information.')
}
