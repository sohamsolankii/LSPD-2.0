import {AsyncHandler} from './../utils/AsyncHandler.js'
import Job from './../models/job.schema.js'
import User from './../models/user.schema.js'
import {intoObjectId} from './../utils/ObjectId.js'
import Application from './../models/application.schema.js'
import {ApiResponse} from './../utils/ApiResponse.js'
import {ApiError} from './../utils/ApiError.js'
import sendMail from '../helper/sendMail.js'

// * Creata a new Application
export const createNewApplication = AsyncHandler(async (req, res) => {
    const jobID = req.params.jobID
    const userID = req.user?.id
    const userObjId = intoObjectId(userID)
    const jobObjID = intoObjectId(jobID)

    const job = await Job.findOne({_id: jobID})
    const user = await User.findOne({_id: userID}).select('-password')
    // const user = await User.aggregate([
    //     {
    //         $match: {
    //             _id: userObjId,
    //         },
    //     },
    // ])

    // const validApplication = await Application.findOne({
    //     user: userID,
    //     job: jobID,
    // })
    const validApplication = await Application.aggregate([
        {
            $match: {
                $and: [{user: userObjId}, {job: jobObjID}],
            },
        },
    ])

    if (validApplication[0])
        throw new ApiError(
            404,
            `Application already exists for ${req.user.name} user`,
        )

    const newApplicaton = await Application.create({
        user: userID,
        job: jobID,
    })

    res.status(200).json(
        new ApiResponse(200, {newApplicaton, user}, 'New Application created'),
    )
})

// * Fetch All Applications for Admin for Approval
export const fetchApplicatonData = AsyncHandler(async (req, res) => {
    const application = await Application.aggregate([
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
                            crimes: 0,
                        },
                    },
                ],
            },
        },
        {
            $lookup: {
                from: 'jobs',
                localField: 'job',
                foreignField: '_id',
                as: 'job',
            },
        },
        {
            $unwind: {
                path: '$user',
            },
        },
        {
            $sort: {
                createdAt: -1,
            },
        },
    ])

    res.status(200).json(
        new ApiResponse(200, application, 'Applications fetched successfully'),
    )
})

// * Admin can  approve an Application
export const approveApplications = AsyncHandler(async (req, res) => {
    const applicationID = req.params.applicationID

    const application = await Application.findOne({_id: applicationID})

    if (!application) throw new ApiError(404, 'Application not found')

    const user = await User.findOne({_id: application.user})
    console.log(user)

    user.jobs.push(applicationID)
    await user.save()

    const delApplication = await Application.findByIdAndDelete(applicationID)

    res.status(200).json(
        new ApiResponse(200, user, 'Applications approved successfully'),
    )
	//! Will start in expo
    sendMail(
		user.email,'Job Application Updates!',`Hi ${user.name},\n\nThank you for applying for the job!. We're happy to say you are perfect match for us. Together, we can make our city a safer place! If you have any questions or need assistance, don't hesitate to reach out us at any time. We will futher guide you regarding the job.\n\nStay sharp,\nThe LSPD Team,`
    )
})

// * Admin can disapprove an Application
// ! Not Test
export const disapproveApplications = AsyncHandler(async (req, res) => {
	const applicationID = req.params.applicationID
    const application = await Application.findOne({_id: applicationID})
	
    if (!application) throw new ApiError(404, 'Application not found')
		
		const user = await User.findOne({_id: application.user})
		
		const delApplication = await Application.findByIdAndDelete(applicationID)
		
		res.status(200).json(
			new ApiResponse(200, null, 'Applications disapproved '),
		)
	//! Will start in expo
	sendMail(user.email, 'Job Application Updates!',`Hi ${user.name},\n\nThank you for applying for the job!. Sad to say we can't work together if there is future requirement we will inform you.\n\nStay sharp,\nThe LSPD Team,`,)
})
