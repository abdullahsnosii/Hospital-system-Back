import { Router } from 'express'
import { successResponse } from '../../common/utils/index.js'
import { validation } from '../../middleware/index.js'
import * as validators from './department.validation.js'
import { getDepartmentById, getDepartments } from './department.servise.js'

const router = Router()

router.get('/', validation(validators.listDepartments), async (req, res) => {
    const data = await getDepartments(req.validate.query.search)
    return successResponse(res, data, 'Departments listed successfully', 200)
})

router.get('/:id', validation(validators.getDepartment), async (req, res) => {
    const data = await getDepartmentById(req.validate.params.id)
    return successResponse(res, data, 'Department retrieved successfully', 200)
})

export default router
