// Imports
import dotenv from 'dotenv'

// Load .env
dotenv.config()

// Environment
export const NODE_ENV = process.env.NODE_ENV

// Port
export const PORT = process.env.PORT

// Database
export const MONGO_URL = process.env.MONGO_URL

// URL
export const WEB_URL = process.env.WEB_URL
export const API_URL = process.env.API_URL
