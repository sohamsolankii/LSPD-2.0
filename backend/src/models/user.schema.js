import mongoose from 'mongoose'
const Schema = mongoose.Schema
const saltRounds = 10
import bcrypt from 'bcryptjs'
import validator from 'validator'

const userSchema = new Schema(
    {
        name: String,
        email: {
            type: String,
            unique: true,
            validate: [validator.isEmail, 'Please provide a valid Email!']
        },
        password: String,
        crimes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Crime',
            },
        ],
        jobs: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Job',
            },
        ],
    },
    {
        timestamps: true,
    },
)
const hashPassword = async (password) => {
    return await bcrypt.hash(password, saltRounds)
}

// * Presave hook for hashedPassword not directly saved
userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        this.password = await hashPassword(this.password)
    }
    next()
})



const User = mongoose.model('User', userSchema)
// User -> user thai jase  but refernce mate sme name aapvu
export default User
