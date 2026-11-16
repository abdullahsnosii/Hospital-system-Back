import mongoose from 'mongoose'
import { APPOINTMENT_STATUSES, AppointmentStatus } from '../../common/enum/appointment.enum.js'
const appointmentSchema = new mongoose.Schema({ patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true, index: true }, doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true, index: true }, startAt: { type: Date, required: true }, endAt: { type: Date, required: true }, status: { type: String, enum: APPOINTMENT_STATUSES, default: AppointmentStatus.BOOKED }, reason: { type: String, trim: true, maxlength: 500 } }, { timestamps: true })
appointmentSchema.index({ doctorId: 1, startAt: 1 }, { unique: true, partialFilterExpression: { status: { $in: ['booked', 'confirmed'] } } })
export const AppointmentModel = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema)
