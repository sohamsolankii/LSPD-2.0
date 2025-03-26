import express from 'express'
import {authValidator} from '../middleware/auth.middleware.js'
// import {
//     addCrime,
//     fetchMostWantedList,
//     fetchSpecificWantedUser,
// } from '../controllers/crime.controller.js'

import {upload} from '../middleware/multer.middleware.js'
import {
    addWantedUser,
    fetchAllWantedUsers,
} from '../controllers/crime.controller.js'

const router = express.Router()

// router.route('/add-crime/:userID').post(addCrime)

// router.route('/wanted-list-user/:userID').get(fetchSpecificWantedUser)

// router.route('/wanted-list').get(fetchMostWantedList)

router.route('/addWantedUser').post(upload.single('image'), addWantedUser)

router.route('/fetch-wantedUsers').get(fetchAllWantedUsers)

export default router
