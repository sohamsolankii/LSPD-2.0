import express from 'express'
import {signUp, logIn, logOut, adminLogin, adminLogout, forgotPassword, resetPassword} from '../controllers/auth.controller.js'
import {authValidator} from '../middleware/auth.middleware.js'

const router = express.Router()

// * Sign Up
router.route('/signup').post(signUp)

// * Log In
router.route('/login').post(logIn)

// * Log out
router.get("/logout", authValidator, logOut)

// Forgot password
router.route('/forgot-password').post(forgotPassword);

// Reset password
router.route('/reset-password').post(resetPassword);


// * amdin logIn
router.route('/admin-login').post(adminLogin)

// * admin logout
router.route('/admin-logout').get(adminLogout)


export default router
