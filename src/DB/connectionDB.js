import mongoose from 'mongoose'
import { DB_NAME, DB_URI } from '../config.js'
import { AccessCodeModel, DepartmentModel, DoctorModel, PatientModel, StaffModel, UserModel } from './model/index.js'

export const bootstrapDB = async (app, port) => {
  try {
    await mongoose.connect(DB_URI, { serverSelectionTimeoutMS: 5000, dbName: DB_NAME || undefined })
    console.log('Database connected successfully')
    // بيتأكد إن الـ unique / sparse indexes اتعملت
    await Promise.all([UserModel, PatientModel, DoctorModel, StaffModel, DepartmentModel, AccessCodeModel].map(model => model.syncIndexes()))
    app.listen(port, () => { console.log(`Server is running on port ${port}`); });
  } catch (error) {
    console.log('Database connection failed', error)
  }
}
