export const successResponse = (res, data = undefined, message = true, status = 200) => {
    return res.status(status).json({ message, status, data });
};
