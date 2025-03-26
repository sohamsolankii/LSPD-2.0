import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUD_API_KEY,
//     api_secret: process.env.CLOUD_API_SECRET,
// })
cloudinary.config({
    cloud_name: 'dxrzskzvj',
    api_key: '811454378431921',
    api_secret: 'Z6kOgl8t9Jx1yGQg3EuZEhzNOXc',
})
export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null

        console.log('Uploading file to Cloudinary:', localFilePath)

        const transformation = {
            quality: 'auto:low',
        }

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
            transformation: transformation,
        })

        console.log('Cloudinary Upload Response:', response)

        return response
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error)
        return null
    } finally {
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath)
        }
    }
}
