import express from 'express'
import {createJob, showLatestJobs} from './../controllers/job.controller.js'
const router = express.Router()

router.route('/').post(createJob).get(showLatestJobs)

export default router
