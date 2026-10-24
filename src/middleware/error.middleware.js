import { NODE_ENV } from '../config.js'

export const globalErrorHandler = (err, req, res, next) => {
    let status = err.cause?.status ?? err.status ?? err.statusCode ?? 500
    let message = err.message || 'internal server error'

    if (err.code === 11000) { // duplicate key
        status = 409
        message = `${Object.keys(err.keyPattern ?? {})[0] ?? 'field'} already exists`
    } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        status = 400
    }

    if (status >= 500) {
        console.error(err)
        if (NODE_ENV === 'production') message = 'internal server error'
    }

    return res.status(status).json({
        error_message: message,
        cause: err.cause?.issues ? { issues: err.cause.issues } : undefined,
        stack: NODE_ENV === 'development' && status >= 500 ? err.stack : undefined
    })
}
