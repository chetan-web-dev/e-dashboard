function formatError(error) {

    // Mongoose Validation Error
    if (error.name === 'ValidationError') {
        return Object.values(error.errors)
            .map(err => err.message)
            .join(', ');
    }

    // Duplicate Key Error (MongoDB)
    if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        return `${field} already exists.`;
    }

    // Invalid ObjectId
    if (error.name === 'CastError') {
        return `Invalid ${error.path}.`;
    }

    // JWT Errors
    if (error.name === 'JsonWebTokenError') {
        return 'Invalid token.';
    }

    if (error.name === 'TokenExpiredError') {
        return 'Token expired.';
    }

    // Custom Errors (from service)
    if (error.message) {
        return error.message;
    }

    return "Internal Server Error";
}

module.exports = {
    formatError
};