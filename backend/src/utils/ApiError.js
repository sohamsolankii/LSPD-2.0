export class ApiError extends Error {
    constructor(
        statusCode,
        message = 'Something went wrong',
        errors = [],
        stack = '',
    ) {
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.success = false
        this.errors = errors
        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }

    toJSON() {
        return {
            statusCode: this.statusCode,
            data: this.data,
            success: this.success,
            message: this.message,
            errors: this.errors,
        }
    }
}
