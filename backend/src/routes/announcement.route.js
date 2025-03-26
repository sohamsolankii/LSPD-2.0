import express from 'express'
import {validateAdmin} from './../middleware/validateAdmin.middleware.js'
import {
    updateAnnouncement,
    createAnnouncement,
    fetchAnnouncement,
    deleteAnnouncement,
    fetchSpecificAnnouncement,
    addLikes,
    addDislikes,
} from '../controllers/announcement.controller.js'
import {upload} from '../middleware/multer.middleware.js'

const router = express.Router()

router
    .route('/')
    .post(upload.single('image'), createAnnouncement)
    .get(fetchAnnouncement)

router.route('/watch/:announcementID').get(fetchSpecificAnnouncement)

router.route('/delete-announcement/:announcementID').delete(deleteAnnouncement)

router
    .route('/update-announcement/:announcementID')
    .put(upload.single('image'), updateAnnouncement)


router.route('/add-like').get(addLikes)

router.route('/add-dislike').get(addDislikes)

export default router
