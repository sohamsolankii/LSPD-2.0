import express from 'express'
import {
    createCrimeDetails,
    fetchCrimeDetails,
} from '../controllers/reportCrime.controller.js'
import {authValidator} from '../middleware/auth.middleware.js'

const router = express.Router()

router
    .route('/report-crime')
    .post(authValidator, createCrimeDetails)
    .get(fetchCrimeDetails)

export default router
