import mongoose from 'mongoose'
const Schema = mongoose.Schema

const crimeSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        crime: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    },
)

const Crime = mongoose.model('Crime', crimeSchema)

export default Crime
