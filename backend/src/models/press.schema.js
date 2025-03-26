import mongoose from 'mongoose'
const Schema = mongoose.Schema

const pressSchema = new Schema(
    {
        code: Number,
        expiresAt: {
            type: Date,
            default: Date.now, // Set the default value to the current time
            index: {expires: '30m'}, // Automatically delete documents after 30 minutes
        },
    },
    {
        timestamps: true,
    },
)

const Press = mongoose.model('Press', pressSchema)
export default Press
