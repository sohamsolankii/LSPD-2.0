import mongoose from 'mongoose'
const {ObjectId} = mongoose.Types

export const intoObjectId = (id) => {
    return new ObjectId(id)
}
