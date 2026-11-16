import mongoose from 'mongoose'
import { DB_NAME, DB_URI } from '../config.js'
import './model/index.js'

export const bootstrapDB = async (app, port) => {
  try {
    mongoose.set('autoIndex', false)
    await mongoose.connect(DB_URI, { serverSelectionTimeoutMS: 5000, dbName: DB_NAME || undefined })
    console.log('Database connected successfully')
    // Index synchronization is intentionally not run at startup: the Atlas application user
    // may not have createIndex/dropIndex privileges. Deploy schema indexes separately.
    app.listen(port, () => { console.log(`Server is running on port ${port}`); });
  } catch (error) {
    console.log('Database connection failed', error)
  }
}

// import mongoose from "mongoose"
// import { DB_NAME, DB_URI } from "../config.js"

// export const bootstrapDB = async (app, port) => {
//     try {
//         await mongoose.connect(DB_URI, {
//             serverSelectionTimeoutMS: 5000,
//             dbName: DB_NAME || undefined
//         })

//         console.log("Database connected successfully")

//         app.listen(port, () => {
//             console.log(`Server is running on port ${port}`)
//         })
//     } catch (error) {
//         console.error("Server startup failed:", error.message)
//     }
// }
