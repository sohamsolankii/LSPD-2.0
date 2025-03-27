import jwt from 'jsonwebtoken'
import {AsyncHandler} from '../utils/AsyncHandler.js'

export const authValidator = AsyncHandler((req, res, next) => {
    const cookie = req.cookies?.userCookie
    if (cookie) {
		// console.log('cookie', cookie);
        jwt.verify(cookie, process.env.ACCESS_TOKEN, (err, decoded) => {
            if (err) {
				console.log('Token verification failed:', err.message) // Log the error for debugging
				return res
					.status(403)
					.json({message: 'Token is expired or invalid'})
            }
            req.user = decoded.user
            next()
        })
    } else {
        res.status(401).json('User not authenticated')
		console.log('User not authenticated')
    }
})
