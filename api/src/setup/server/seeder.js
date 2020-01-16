// Imports
import mongoose from 'mongoose'

// App Imports
import { NODE_ENV } from '../config/env'
import { connect } from '../server/database'
import product from '../../modules/product/seed'
import wall from '../../modules/wall/seed'

// Seeder
async function seeder() {
  console.log('SEED - Started')

  await connect()

  // Clear database, only in development, do not do in production. I repeat, do not do it in production or you will be featured on www.commitstrip.com!
  if(NODE_ENV === 'development') {
    console.log('SEED - Dropping database.. ❗')

    await mongoose.connection.dropDatabase()
  }

  // Seeds
  await product()
  await wall()

  // Close connection
  mongoose.connection.close()

  console.log('SEED - Complete. ✅')
}

// Run seeder
seeder()
