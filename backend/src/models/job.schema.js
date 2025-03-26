import mongoose from 'mongoose'
const Schema = mongoose.Schema

const jobSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
        },
        location: {
            type: String,
            required: [true, 'Location is required'],
        },
        jobType: {
            type: String,
            enum: [
                'FullTime',
                'PartTime',
                'Temporary',
                'Contract',
                'Internship',
            ],
            default: 'FullTime',
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
        },
        requirements: {
            type: [String],
            default: [],
        },
        responsibilities: {
            type: [String],
            default: [],
        },
        salaryRange: {
            type: String,
        },
        applicationDeadline: {
            type: Date,
        },
        contactEmail: {
            type: String,
            required: [true, 'Contact email is required'],
            match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
        },
        postedDate: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    },
)

const Job = mongoose.model('Job', jobSchema)

export default Job
