import React, {useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-hot-toast'

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')

    const handleForgotPassword = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post('/api/v1/auth/forgot-password', {
                email,
            })
            const responseData = response.data

            if (responseData.error) {
                toast.error(responseData.error)
            } else {
                toast.success('Password reset link sent to your email')
                navigate('/login')
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                toast.error(err.response.data.error)
            } else {
                toast.error('Something went wrong. Please try again.')
            }
            console.log(err)
        }
    }

    return (
        <div
            className="poppins relative min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{backgroundImage: "url('/src/assets/formbg3.jpeg')"}}
        >
            <div className="absolute inset-0 bg-[var(--bg2)] opacity-80"></div>
            <div className="bg-[var(--bg3op)] relative z-10 p-8 px-12 py-20 text-[var(--lblue)] glassgrad rounded-2xl backdrop-blur-md border-2 border-[#475569] transition ease-in-out delay-300 hover:backdrop-blur-2xl shadow-black/70 shadow-2xl w-[90%] md:w-[70%] lg:w-[25%]">
                <h2 className="text-3xl lg:text-5xl pricedown text-[var(--lgold)] font-bold mb-7 text-center">
                    Forgot Password
                </h2>
                <form onSubmit={handleForgotPassword}>
                    <div className="mb-4">
                        <label className="block mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-3 px-5 rounded-lg bg-[var(--opac)] backdrop-blur-sm text-[var(--ltext)]"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 mt-8 bg-[var(--lblue)] glassgrad2 shadow-black/70 shadow-2xl backdrop-blur-sm font-medium text-[var(--ltext)] hover:text-[var(--bg2)] rounded-lg hover:bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400"
                    >
                        Send Reset Link
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <Link
                        to="/login"
                        className="text-[var(--lblue)] hover:text-[var(--lgold)]"
                    >
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
