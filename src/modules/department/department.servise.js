
import { DepartmentModel } from '../../DB/model/department.model.js';
import { NotFoundException } from '../../common/exceptions/index.js';

export const getDepartments = async (search) => {
    const filter = {};

    if (search) {
        filter.name = {
            $regex: search,
            $options: 'i'
        };
    }

    return await DepartmentModel.find(filter)
        .select('name')
        .sort({ name: 1 });
};

export const getDepartmentById = async (id) => {
    const department = await DepartmentModel.findById(id)
        .select('name');

    if (!department) {
        throw NotFoundException('Department not found');
    }

    return department;
};
