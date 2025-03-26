import mongoose from 'mongoose'
const Schema = mongoose.Schema

const reportCrimeSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User is required'],
        },
        complaint: {
            type: String,
            required: [true, 'Complaint is required'],
        },
        location: {
            type: String,
            required: [true, 'Location is required'],
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
        },
    },
    {
        timestamps: true,
    },
)

const ReportCrime = mongoose.model('ReportCrime', reportCrimeSchema)
export default ReportCrime
