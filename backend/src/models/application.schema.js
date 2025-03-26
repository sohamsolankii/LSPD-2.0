import mongoose from 'mongoose'
const Schema = mongoose.Schema

const applicationSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User is required'],
        },
        job: {
            type: Schema.Types.ObjectId,
            ref: 'Job',
            required: [true, 'Job is required'],
        },
    },
    {
        timestamps: true,
    },
)

const Application = mongoose.model('Application', applicationSchema)

export default Application
