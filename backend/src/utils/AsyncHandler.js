//  const asyncHandler = (fn) => async (err, req, res, next) => {
//     try {
//         await fn(err, req, res, next)
//     } catch (err) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message,
//         })
//     }
// }

export const AsyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => {
            next(err)
        })
    }
}
