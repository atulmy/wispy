// Imports
import mongoose, { Schema } from 'mongoose'

// Collection name
export const collection = 'Product'

// Schema
const schema = new Schema({
  name: {
    type: String,
    required: true
  },

  description: {
    type: String
  }
}, {timestamps: true})

// Model
export default mongoose.model(collection, schema, collection)
