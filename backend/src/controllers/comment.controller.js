import {AsyncHandler} from '../utils/AsyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from './../utils/ApiResponse.js'
import Comment from '../models/comment.schema.js'
import {checkParams} from '../validators/checkParams.js'
import Announcement from './../models/announcement.schema.js'

// * Create a new comment
export const addComment = AsyncHandler(async (req, res) => {
    const user = req?.user.id
    const comment = req.body.comment
    const announcementID = req.params.news

    const announcement = await Announcement.findOne({_id: announcementID})

    if (!announcement) throw new ApiError(404, 'No announcement found')

    const newComment = new Comment({
        user,
        comment,
        news: announcementID,
    })

    await newComment.save()
    announcement.comments.push(newComment)
    await announcement.save()

    res.status(200).json(new ApiResponse(200, comment, 'New Comment Created'))
})

// * Fetch Comments for a specific news
export const fetchComment = AsyncHandler(async (req, res) => {
    const news = req.params.news
    console.log(req.params)

    // checkParams(req, 'news', Comment)

    // const comments = await Comment.find().populate('userID')

    const comments = await Comment.aggregate([
        {
            $match: {
                news: news,
            },
        },
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
            },
        },
    ])

    res.status(200).json(
        new ApiResponse(200, comments, 'Comments fetched successfully'),
    )
})
