import {ApiError} from '../utils/ApiError.js'

export const checkParams = async (req, paramName, Schema) => {
    const param = req.params[paramName]

    if (!param) throw new ApiError(404, `Missing param: ${paramName}`)

    const content = await Schema.findOne({_id: param})

    if (!content)
        throw new ApiError(
            404,
            `${paramName} not found in ${Schema.collection.name}`,
        )
}
