import mongoose from 'mongoose'
const Schema = mongoose.Schema

const announcementSchema = new Schema({
    image: {
        type: String,
        required: [true, 'Image is Required'],
    },
    title: {
        type: String,
        required: [true, 'Title is Required'],
    },
    description: {
        type: String,
        required: [true, 'Description is Required'],
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
    likes: {
        type: Number,
        default: 0,
    },
    likedBy: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    dislikes: {
        type: Number,
		default: 0,
    },
    dislikedBy: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
})

const Announcement = mongoose.model('Announcement', announcementSchema)

export default Announcement
