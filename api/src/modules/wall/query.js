// App Imports
import Wall from './model'

// Get all
export async function wallList({ fields }) {
  try {
    const data = await Wall
      .find()
      .sort({ createdAt: -1 })
      .select(fields)

    return {
      data
    }
  } catch (error) {
    throw new Error('Unable to perform this operation. Please try again.')
  }
}
