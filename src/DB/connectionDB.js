import { mongoose} from "mongoose"
import { DB_URI } from "../config.js"
import { DB_NAME } from "../config.js"
import { PatientModel } from './model/patient.model.js'

export const bootstrapDB = async (app, port) => {
  try {
    await mongoose.connect(DB_URI, {serverselectionTimeoutMS: 5000})
    console.log("Database connected successfully")
    await PatientModel.syncIndexes() // عشان DUBLICATION و عشان فكره التكرار بيتاكد الاول 
    app.listen(port, () => { console.log(`Server is running on port ${port}`); });
  } catch (error) {
    console.log("Database connection failed", error)
  }
}


