import mongoose from 'mongoose'
const Schema = mongoose.Schema

const commentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            require: [true, 'User is required for comment'],
            ref: 'User',
        },
        comment: {
            type: String,
            require: [true, 'Comment is required'],
        },
        news: {
            // type: Schema.Types.ObjectId,
            // require: [true, 'News is required'],
            // ref: 'News',
            type: String,
        },
    },
    {
        timestamps: true,
    },
)

const Comment = mongoose.model('Comment', commentSchema)

export default Comment
