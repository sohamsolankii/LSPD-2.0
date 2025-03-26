import MostWantedUser from '../models/mostWantedUser.schema.js' // Assuming you have renamed the model file
import {ApiResponse} from '../utils/ApiResponse.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import {AsyncHandler} from './../utils/AsyncHandler.js'

export const addWantedUser = AsyncHandler(async (req, res) => {
    const {user, crime, rating, aliases} = req.body // 'crime' instead of 'crimes'
    const imageFile = req.file?.path

    if (!imageFile) {
        return res.status(400).json({message: 'No file uploaded'})
    }

    const uploadResult = await uploadOnCloudinary(imageFile)
    if (!uploadResult) {
        return res.status(500).json({message: 'Failed to upload image'})
    }

    const image = uploadResult.url

    const newWantedUser = await MostWantedUser.create({
        user,
        crime,
        rating,
        image,
        aliases,
    })

    res.status(200).json(
        new ApiResponse(
            200,
            newWantedUser,
            'New Wanted User added successfully',
        ),
    )
})

export const fetchAllWantedUsers = AsyncHandler(async (req, res) => {
    const wantedUsers = await MostWantedUser.find()

    console.log(wantedUsers)

    res.status(200).json(
        new ApiResponse(
            200,
            wantedUsers,
            'All Wanted Users fetched successfully',
        ),
    )
})
