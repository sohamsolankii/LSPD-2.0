import {AsyncHandler} from '../utils/AsyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from './../utils/ApiResponse.js'
import Tip from '../models/tip.schema.js'

// * Create a new Tip
export const addTip = AsyncHandler(async (req, res) => {
    const user = req?.user.id
    const tipContent = req.body.message // Get the tip content from the request body
    const isAnonymous = req.body.isAnonymous
    console.log('this is backend tip:', tipContent)
    console.log('isAnonymous:', isAnonymous)

    //! Check that the user is not an admin
    if (req.user.name === 'admin') {
        return res.status(403).json(new ApiError(403, 'Admin cannot add a tip'))
    }

    const newTip = new Tip({
        user: isAnonymous ? null : user, // If anonymous, user is null
        tip: tipContent,
    })

    await newTip.save()

    res.status(200).json(new ApiResponse(200, newTip, 'New Tip Created'))
})


// * Fetch Tips
export const fetchTip = AsyncHandler(async (req, res) => {
    const comments = await Tip.aggregate([
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
            $unwind: {
                path: '$user',
                preserveNullAndEmptyArrays: true, // Allow anonymous tips
            },
        },
    ])

    res.status(200).json(
        new ApiResponse(
            200,
            comments,
            'Comments fetched successfully',
        ).toJSON(),
    )
})


// * Delete a Tip
export const deleteTip = AsyncHandler(async (req, res) => {
    const tipId = req.params.id;

    // Find the tip
    const tip = await Tip.findById(tipId);
    if (!tip) {
        return res.status(404).json(new ApiError(404, 'Tip not found'));
    }

    await Tip.deleteOne({ _id: tipId });

    res.status(200).json(new ApiResponse(200, null, 'Tip deleted successfully'));
});

