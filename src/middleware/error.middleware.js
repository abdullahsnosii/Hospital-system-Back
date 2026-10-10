export const globalErrorHandler = (err, req, res , next) => {
    return res.status(err.cause?.status ?? 500 ).
    json({
        error_message: err.message || "internal server error"
        , cause: err.cause
    });
}