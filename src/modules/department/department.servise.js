import { DepartmentModel } from '../../DB/model/department.model.js'
import { NotFoundException } from '../../common/exceptions/index.js'

export const getDepartments = async (search) => {
    const filter = { isActive: true }
    if (search) filter.name = { $regex: search, $options: 'i' }
    return DepartmentModel.find(filter).select('name').sort({ name: 1 })
}

export const getDepartmentById = async (id) => {
    const department = await DepartmentModel.findOne({ _id: id, isActive: true }).select('name')
    if (!department) throw NotFoundException('Department not found')
    return department
}
