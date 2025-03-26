import {AsyncHandler} from '../utils/AsyncHandler.js'
import Announcement from './../models/announcement.schema.js'
import {ApiResponse} from './../utils/ApiResponse.js'
import {checkParams} from './../validators/checkParams.js'
import {intoObjectId} from './../utils/ObjectId.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'

// * Create announcement
export const createAnnouncement = AsyncHandler(async (req, res) => {
    console.log('Cloudinary Name:', process.env.CLOUD_NAME)

    const {title, description} = req.body
    const imageFile = req.file?.path

    if (!imageFile) {
        return res.status(400).json({message: 'No file uploaded'})
    }

    const uploadResult = await uploadOnCloudinary(imageFile)

    if (!uploadResult) {
        return res.status(500).json({message: 'Failed to upload image'})
    }

    const image = uploadResult.url

    const newAnnouncement = await Announcement.create({
        image,
        title,
        description,
    })

    res.status(200).json(
        new ApiResponse(
            200,
            newAnnouncement,
            'New Announcement created successfully',
        ),
    )
})

export const fetchSpecificAnnouncement = AsyncHandler(async (req, res) => {
    await checkParams(req, 'announcementID', Announcement)
    const announcementID = req.params.announcementID

    const announcementObjID = intoObjectId(announcementID)

    const announcement = await Announcement.aggregate([
        {
            $match: {
                _id: announcementObjID,
            },
        },
        {
            $lookup: {
                from: 'comments',
                localField: 'comments',
                foreignField: '_id',
                as: 'comments',
                pipeline: [
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'user',
                            foreignField: '_id',
                            as: 'user',
                        },
                    },
                    {
                        $unwind: '$user',
                    },
                ],
            },
        },
    ])

    if (!announcement[0]) throw new ApiError(404, `Announcement not found`)

    res.status(200).json(
        new ApiResponse(200, announcement[0], 'fetched successfully'),
    )
})

// * Fetch announcement
export const fetchAnnouncement = AsyncHandler(async (req, res) => {
    // const announcements = await Announcement.aggregate([{$match: '_id'}])

    const announcements = await Announcement.find()

    res.status(202).json(
        new ApiResponse(
            202,
            announcements,
            'Announcements fetched successfully',
        ),
    )
})

export const updateAnnouncement = AsyncHandler(async (req, res) => {
    const id = req.params?.announcementID
    const {description, title} = req.body
    let imageNew = null

    // Check if a new image is uploaded
    if (req.file?.path) {
        const uploadResult = await uploadOnCloudinary(req.file.path)
        if (!uploadResult) {
            return res.status(500).json({message: 'Failed to upload image'})
        }
        imageNew = uploadResult.url
    }

    // Create an object with updated fields
    const updatedFields = {description, title}
    if (imageNew) {
        updatedFields.image = imageNew
    }

    // Find and update the announcement
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
        id,
        updatedFields,
        {new: true}, // To return the updated document
    )

    // If the announcement does not exist
    if (!updatedAnnouncement) {
        return res
            .status(404)
            .json(new ApiResponse(404, null, 'Announcement not found'))
    }

    // Respond with the updated announcement
    res.status(200).json(
        new ApiResponse(
            200,
            updatedAnnouncement,
            'Announcement updated successfully',
        ),
    )
})

// * Delete announcement
export const deleteAnnouncement = AsyncHandler(async (req, res) => {
    const id = req.params?.announcementID
    console.log(id)

    const delAnnouncement = await Announcement.findByIdAndDelete(id)

    console.log(delAnnouncement)

    res.status(200).json(
        new ApiResponse(200, delAnnouncement, 'Announcement deleted'),
    )
})

// * create a like
export const addLikes = AsyncHandler(async (req, res) => {
    const id = req.query.id;
    const userId = req.query.userId;

    console.log('this is user id ', userId);

    const announcement = await Announcement.findOne({ _id: id });

    if (!announcement) throw new ApiError(404, 'No announcement found');

    const userHasLiked = announcement.likedBy.includes(userId);

    // Ensure likes is a valid number before incrementing/decrementing
    if (isNaN(announcement.likes)) {
        announcement.likes = 0;
    }

    if (userHasLiked) {
        // User already liked the post, so unlike it
        announcement.likes -= 1;
        announcement.likedBy.pull(userId);
    } else {
        // User has not liked the post, so like it
        announcement.likes += 1;
        announcement.likedBy.push(userId);
    }

    await announcement.save();

    res.status(200).json(
        new ApiResponse(200, announcement.likes, 'Like status updated'),
    );
});

// * create a dislike
export const addDislikes = AsyncHandler(async (req, res) => {
    const id = req.query.id
    const userId = req.query.userId

    const announcement = await Announcement.findOne({_id: id})

    if (!announcement) throw new ApiError(404, 'No announcement found')

    const userDisLiked = announcement.dislikedBy.includes(userId);

	if(isNaN(announcement.dislikes)){
		announcement.dislikes = 0;
	}

	if(userDisLiked){
		announcement.dislikes -= 1
        announcement.dislikedBy.pull(userId)
	}
	else{
		announcement.dislikes += 1
        announcement.dislikedBy.push(userId)
	}

	await announcement.save();
	res.status(200).json(
        new ApiResponse(200, announcement.dislikes, 'Like status updated'),
    )

})
