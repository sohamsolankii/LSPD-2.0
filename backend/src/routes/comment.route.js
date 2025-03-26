import express from 'express'
import {addComment, fetchComment} from '../controllers/comment.controller.js'
import {authValidator} from '../middleware/auth.middleware.js'

const router = express.Router()

// * Create a new comment
router.route('/add-comment/:news').post(authValidator, addComment)

// * Fetch Comments for a specific news
router.route('/fetch-comment/:news').get(fetchComment)

// TODO : Display a Specific Announcement with Comments
// TODO : Add Comment for a specific Announcement
export default router
