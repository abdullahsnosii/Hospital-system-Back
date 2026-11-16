import mongoose from 'mongoose'
import { DoctorModel } from '../../DB/model/doctor.model.js'
import { ScheduleModel } from '../../DB/model/schedule.model.js'
import { AppointmentModel } from '../../DB/model/appointment.model.js'
import { BadRequestException, NotFoundException } from '../../common/exceptions/index.js'
const getDoctor = async userId => { const d = await DoctorModel.findOne({ userId }); if (!d) throw NotFoundException('Doctor profile not found'); return d }
export const getMySchedule = async userId => { const d = await getDoctor(userId); return await ScheduleModel.findOne({ doctorId: d._id }) }
export const saveMySchedule = async (userId, input) => {
 const doctor = await getDoctor(userId);
 for (const x of input.weeklyHours) if (x.startTime >= x.endTime) throw BadRequestException('Each schedule end time must be later than start time')
 const days = input.weeklyHours.map(x => x.dayOfWeek); if (new Set(days).size !== days.length) throw BadRequestException('A weekday can only be configured once')
 return ScheduleModel.findOneAndUpdate({ doctorId: doctor._id }, { $set: { weeklyHours: input.weeklyHours, slotDurationMinutes: input.slotDurationMinutes } }, { upsert: true, new: true, runValidators: true })
}
export const getAvailableSlots = async (doctorId, date) => {
 if (!mongoose.isValidObjectId(doctorId)) throw BadRequestException('Invalid doctor ID')
 const doctor = await DoctorModel.findById(doctorId); if (!doctor) throw NotFoundException('Doctor not found')
 const schedule = await ScheduleModel.findOne({ doctorId }); if (!schedule) return []
 const day = new Date(`${date}T00:00:00.000Z`); if (Number.isNaN(day.getTime()) || day.toISOString().slice(0,10) !== date) throw BadRequestException('Invalid date')
 const rule = schedule.weeklyHours.find(x => x.dayOfWeek === day.getUTCDay()); if (!rule) return []
 const [sh, sm] = rule.startTime.split(':').map(Number), [eh, em] = rule.endTime.split(':').map(Number)
 const start = new Date(day); start.setUTCHours(sh, sm, 0, 0); const end = new Date(day); end.setUTCHours(eh, em, 0, 0)
 const existing = await AppointmentModel.find({ doctorId, status: { $in: ['booked','confirmed'] }, startAt: { $gte: start, $lt: end } }).select('startAt')
 const taken = new Set(existing.map(x => x.startAt.toISOString())); const slots = []
 for (let t = start.getTime(); t + schedule.slotDurationMinutes*60000 <= end.getTime(); t += schedule.slotDurationMinutes*60000) { const slotStart = new Date(t); if (slotStart.getTime() <= Date.now()) continue; if (!taken.has(slotStart.toISOString())) slots.push({ startAt: slotStart, endAt: new Date(t + schedule.slotDurationMinutes*60000) }) }
 return slots
}
