// Imports
import mongoose from 'mongoose'

// App Imports
import { NODE_ENV } from '../config/env'
import database from '../server/database'
import product from '../../modules/product/seed'

// Seeder
async function seeder() {
  console.log('SEED - Started')

  await database()

  // Clear database, only in development, do not do in production. I repeat, do not do it in production or you will be featured on www.commitstrip.com!
  if(NODE_ENV === 'development') {
    console.log('SEED - Dropping database.. ❗')

    await mongoose.connection.dropDatabase()
  }

  // Seeds
  await product()

  // Close connection
  mongoose.connection.close()

  console.log('SEED - Complete. ✅')
}

// Run seeder
seeder()
