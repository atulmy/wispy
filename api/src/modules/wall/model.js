// Imports
import mongoose, { Schema } from 'mongoose'

// Collection name
export const collection = 'Wall'

// Schema
const schema = new Schema({
  message: {
    type: String,
    required: true
  }
}, {timestamps: true})

// Model
export default mongoose.model(collection, schema, collection)
