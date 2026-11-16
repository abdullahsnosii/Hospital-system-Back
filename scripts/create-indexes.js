import mongoose from 'mongoose'
import { DB_NAME, DB_URI } from '../src/config.js'
import '../src/DB/model/index.js'
import { UserModel, PatientModel, DoctorModel, StaffModel, DepartmentModel, AccessCodeModel, ScheduleModel, AppointmentModel, MedicalHistoryModel, InvoiceModel, NotificationModel } from '../src/DB/model/index.js'

try {
  await mongoose.connect(DB_URI, { dbName: DB_NAME || undefined })
  const models = [UserModel, PatientModel, DoctorModel, StaffModel, DepartmentModel, AccessCodeModel, ScheduleModel, AppointmentModel, MedicalHistoryModel, InvoiceModel, NotificationModel]
  for (const model of models) {
    await model.createIndexes()
    console.log(`Indexes ensured: ${model.collection.collectionName}`)
  }
} catch (error) {
  console.error('Index creation failed:', error.message)
  process.exitCode = 1
} finally {
  await mongoose.disconnect()
}
