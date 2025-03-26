import {AsyncHandler} from '../utils/AsyncHandler.js'
import {ApiResponse} from './../utils/ApiResponse.js'
import ReportCrime from './../models/reportCrime.schema.js'

// * Fetch Crime Details from user
export const fetchCrimeDetails = AsyncHandler(async (req, res) => {
    // ! This method is used for fetch reportCrimes and also populate method for fetching whole user information instead of just Object ID
    //   * const reportedCrimes = await ReportCrime.find().populate('user')

    // ! I'm using this aggregation pipeline instead of this . . .

    const reportedCrimes = await ReportCrime.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user',
                pipeline: [
                    {
                        $project: {
                            password: 0,
                            // name: 1,
                            // crime: 1,
                            // rating: 1,
                            // createdAt: 1,
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: '$user',
            },
        },
    ])

    res.status(201).json(
        new ApiResponse(201, reportedCrimes, 'Fetched successfully'),
    )
})

// * Create Crime Details and show to the police
export const createCrimeDetails = AsyncHandler(async (req, res) => {
    const {complaint, location, description} = req.body

    const createReport = new ReportCrime({
        user: req?.user?.id,
        complaint,
        location,
        description,
    })

    const createdCrimeReport = await createReport.save()
    res.status(201).json(
        new ApiResponse(201, createdCrimeReport, 'Crime reported successfully'),
    )
})
