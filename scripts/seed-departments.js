import mongoose from 'mongoose'
import { DB_NAME, DB_URI } from '../src/config.js'
import { DepartmentModel } from '../src/DB/model/department.model.js'

const departments = [
    { name: 'Cardiology' },
    { name: 'Neurosurgery' },
    { name: 'Neonatology' },
    { name: 'Orthopedics' },
    { name: 'General Internal Medicine' },
]

try {
    await mongoose.connect(DB_URI, { serverSelectionTimeoutMS: 5000, dbName: DB_NAME || undefined })
    for (const department of departments) {
        await DepartmentModel.updateOne(
            { name: department.name },
            { $setOnInsert: department },
            { upsert: true }
        )
    }
    console.log('Departments seeded successfully')
} catch (error) {
    console.error('Department seeding failed:', error.message)
    process.exitCode = 1
} finally {
    await mongoose.disconnect()
}
