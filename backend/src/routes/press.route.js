import express from 'express'
import {addPress, getPress} from '../controllers/press.controller.js'

const router = express.Router()

router.post('/add', addPress)
router.get('/get', getPress)


export default router
