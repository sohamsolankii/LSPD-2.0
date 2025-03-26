import {AsyncHandler} from '../utils/AsyncHandler.js'
import {ApiResponse} from './../utils/ApiResponse.js'
import Press from '../models/press.schema.js'

export const addPress = AsyncHandler(async (req, res) => {
    const code = req.body.code
    console.log('This is backend press:', code)

    const newPress = new Press({code})

    await newPress.save()

    res.status(200).json(new ApiResponse(200, newPress, 'New Press Created'))
})

export const getPress = async (req, res) => {
    try {
        const press = await Press.findOne().sort({createdAt: -1})
        console.log('Press:', press)

        if (!press) {
            res.status(200).json(new ApiResponse(200, 0, 'no code found'))
        }
		else {
			res.status(200).json(
				new ApiResponse(200, press, 'Press code retrieved successfully'),
			)
		}
    } catch (error) {
        res.status(error.statusCode || 500).json(
            new ApiResponse(error.statusCode || 500, null, error.message),
        )
    }
}

//! expire the code
// export const addPress = AsyncHandler(async (req, res) => {
//     const {code} = req.body
//     console.log('This is backend press:', code)

//     // Set the expiration time to 30 minutes from now
//     const expiresAt = new Date(Date.now() + 30 * 60 * 1000)

//     const newPress = new Press({code, expiresAt})

//     await newPress.save()

//     res.status(200).json(new ApiResponse(200, newPress, 'New Press Created'))
// })
