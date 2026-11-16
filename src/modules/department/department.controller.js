
import { Router } from 'express';
import { successResponse } from '../../common/utils/index.js';
import { validation } from '../../middleware/index.js';
import * as validators from './department.validation.js';

import {
    getDepartments,
    getDepartmentById
} from './department.servise.js';

const router = Router();

router.get(
    '/',
    validation(validators.getDepartments),
    async (req, res, next) => {
        const data = await getDepartments(req.validate.query.search);

        return successResponse(
            res,
            data,
            'Departments retrieved successfully',
            200
        );
    }
);

router.get(
    '/:id',
    validation(validators.getDepartmentById),
    async (req, res, next) => {
        const data = await getDepartmentById(req.validate.params.id);

        return successResponse(
            res,
            data,
            'Department retrieved successfully',
            200
        );
    }
);

export default router;
