import bcrypt from 'bcryptjs'
import User from '../models/user.schema.js'
import {AsyncHandler} from '../utils/AsyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from './../utils/ApiResponse.js'
import {setToken} from './../utils/setReqToken.js'
import sendMail from '../helper/sendMail.js'
import jwt from 'jsonwebtoken'

// * Sign Up
export const signUp = AsyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    if (!name || !email || !password) {
        return res.status(400).json({message: 'All fields are required'})
    }

    const validEmail = await User.findOne({email: email})

    // ! Check if email is available
    if (validEmail) {
        return res.status(409).json(new ApiError(409, 'Email already in use'))
    }

    const newUser = new User({
        name,
        email,
        password,
    })
    await newUser.save()

    const accessToken = setToken(req, newUser)

    res.cookie('userCookie', accessToken, {
        httpOnly: true,
    })
        .status(201)
        .json(
            new ApiResponse(
                201,
                {newUser, accessToken},
                'User logged in successfully',
            ),
        )
    sendMail(
        email,
        'Welcome to the LSPD, Rookie!',
        `Hi ${user.name},\n\nWelcome to the LSPD Eagle Eyes. We're here to support and protect the citizens of Los Santos. Together, we can make our city a safer place! If you have any questions or need assistance, don't hesitate to reach out us at any time. We're always here to help:)\n\nStay sharp,\nThe LSPD Team,`,
    )
})

// * Log in
export const logIn = AsyncHandler(async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email: email})

    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new ApiError(401, 'Invalid Details')
    }

    const accessToken = setToken(req, user)

    const hundredYearsInMilliseconds = 100 * 365.25 * 24 * 60 * 60 * 1000

    res.cookie('userCookie', accessToken, {
        httpOnly: true,
        maxAge: hundredYearsInMilliseconds,
    })
        .status(200)
        .json({user, accessToken})
    //! will start in expo
    sendMail(
        email,
        'Welcome to the LSPD, Rookie!',
        `Hi ${user.name},\n\nWelcome to the LSPD Eagle Eyes. We're here to support and protect the citizens of Los Santos. Together, we can make our city a safer place! If you have any questions or need assistance, don't hesitate to reach out us at any time. We're always here to help:)\n\nStay sharp,\nThe LSPD Team,`,
    )
})

// * LogOut
export const logOut = AsyncHandler(async (req, res) => {
    res.clearCookie('userCookie')
        .status(200)
        .json(new ApiResponse(200, {}, 'User logged out successfully'))
})

// * Forgot password
export const forgotPassword = AsyncHandler(async (req, res) => {
    const {email} = req.body
    const oldUser = await User.findOne({email})

    if (!oldUser) {
        throw new ApiError(401, 'Invalid Details')
    }

    // const secret = process.env.JWT_SECRET + oldUser.password;
    // const token = jwt.sign({ id: oldUser._id, email: oldUser.email }, secret, {
    //     expiresIn: '3m',
    // });

    const link = `http://localhost:5173/reset`
    console.log(link)

    // Send the email with the reset link
    await sendMail(
        email,
        'Password Reset Request',
        `Hi ${oldUser.name},\n\nPlease click on the following link to reset your password:\n\n${link}\n\nIf you did not request a password reset, please ignore this email.\n\nThanks,\nThe Team`,
    )

    res.status(200).json({
        message: 'Password reset link sent to your email',
    })
})

// Reset password
export const resetPassword = AsyncHandler(async (req, res) => {
    const {mail, newPassword, confirmPassword} = req.body

    if (newPassword !== confirmPassword) {
        throw new ApiError(400, 'Passwords do not match')
    }

    const oldUser = await User.findOne({email: mail})

    if (!oldUser) {
        throw new ApiError(401, 'User does not exist')
    }

    oldUser.password = newPassword
    await oldUser.save()
    res.status(200).json({message: 'Password has been reset'})
})

// * Login for the Admin
export const adminLogin = (req, res) => {
    const {passkey} = req.body
    const correctPasskey = process.env.ADMIN_PASSKEY

    if (passkey === correctPasskey) {
        const token = jwt.sign({user: 'admin'}, process.env.ACCESS_TOKEN, {
            expiresIn: '2h',
        })
        res.cookie('userCookie', token, {httpOnly: true})
        res.status(200).json({message: 'Access granted'})
    } else {
        res.status(401).json({message: 'Incorrect passkey'})
    }
}

//* admin logout
export const adminLogout = (req, res) => {
    res.clearCookie('userCookie', {httpOnly: true})
    res.status(200).json({message: 'Logout successful'})
}
