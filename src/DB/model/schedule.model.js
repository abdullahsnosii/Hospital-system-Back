import mongoose from 'mongoose'
const daySchema = new mongoose.Schema({ dayOfWeek: { type: Number, min: 0, max: 6, required: true }, startTime: { type: String, required: true, match: /^([01]\d|2[0-3]):[0-5]\d$/ }, endTime: { type: String, required: true, match: /^([01]\d|2[0-3]):[0-5]\d$/ } }, { _id: false })
const scheduleSchema = new mongoose.Schema({ doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true, unique: true }, weeklyHours: { type: [daySchema], default: [] }, slotDurationMinutes: { type: Number, min: 10, max: 120, default: 30 } }, { timestamps: true })
export const ScheduleModel = mongoose.models.Schedule || mongoose.model('Schedule', scheduleSchema)
