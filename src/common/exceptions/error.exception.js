export class ApplicationException extends Error {
    constructor(message = 'error', status = 400, issues = undefined) {
        super(message, { cause: { status, issues } })
    }
}

// الاستخدام: throw ConflictException("Email already exists")
export const BadRequestException = (message = 'Bad request', issues) => new ApplicationException(message, 400, issues)
export const UnauthorizedException = (message = 'Unauthorized', issues) => new ApplicationException(message, 401, issues)
export const ForbiddenException = (message = 'Forbidden', issues) => new ApplicationException(message, 403, issues)
export const NotFoundException = (message = 'Not found', issues) => new ApplicationException(message, 404, issues)
export const ConflictException = (message = 'Conflict', issues) => new ApplicationException(message, 409, issues)
export const TooManyRequestsException = (message = 'Too many requests', issues) => new ApplicationException(message, 429, issues)
