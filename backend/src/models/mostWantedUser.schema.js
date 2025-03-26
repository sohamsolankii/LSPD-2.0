import mongoose from 'mongoose'
const Schema = mongoose.Schema

const mostWantedUserSchema = new Schema({
    user: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },
    crime: {
        type: String,
        require: true,
    },
    rating: {
        type: Number,
        require: true,
    },
    aliases:{
		type: String,
		require: true,
	}
})

const mostWantedUser = mongoose.model('mostWantedUser', mostWantedUserSchema)

export default mostWantedUser
