import mongoose from 'mongoose'
const Schema = mongoose.Schema

const tipSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },
        tip: {
            type: String,
            require: [true, 'Comment is required'],
        },
    },
    {
        timestamps: true,
    },
)

const Tip = mongoose.model('Tip', tipSchema)

export default Tip
