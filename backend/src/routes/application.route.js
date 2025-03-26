import express from 'express'
import {
    createNewApplication,
    fetchApplicatonData,
    approveApplications,
    disapproveApplications,
} from '../controllers/jobPositions.controller.js'
import {authValidator} from '../middleware/auth.middleware.js'
const router = express.Router()

router.route('/fetch-application').get(fetchApplicatonData)

router.route('/:jobID').get(authValidator, createNewApplication)

router.route('/approve-application/:applicationID').get(approveApplications)

router
    .route('/disapprove-application/:applicationID')
    .get(disapproveApplications)

export default router
