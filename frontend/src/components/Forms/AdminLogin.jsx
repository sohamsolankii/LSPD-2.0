import React, {useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-hot-toast'
import {UserContext} from '../../context/userContext'
import axios from 'axios'
import Cookies from 'js-cookie'

const AdminLogin = () => {
    const navigate = useNavigate()
    const {passkey, setPasskey} = useContext(UserContext)

    const handleChange = (e, index) => {
        const value = e.target.value
        if (value.length <= 1) {
            const newPasskey = [...passkey]
            newPasskey[index] = value
            setPasskey(newPasskey)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const localData = {passkey: passkey.join('')}

        try {
            const response = await axios.post(
                '/api/v1/auth/admin-login',
                localData,
                {withCredentials: true},
            )
            if (response.status === 200) {
                // Store passkey in cookies
                Cookies.set('adminPasskey', JSON.stringify(passkey))

                setPasskey(passkey)
                toast.success('Access granted!')
                navigate('/admin')
            }
        } catch (error) {
            toast.error('Incorrect passkey. Try again.')
        }
    }

    return (
        <div
            className="poppins relative min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{backgroundImage: "url('/src/assets/formbg3.jpeg')"}}
        >
            <div className="absolute inset-0 bg-[var(--bg2)] opacity-80"></div>
            <div className="bg-[var(--bg3op)] relative z-10 px-60 py-10 text-[var(--lblue)] glassgrad rounded-2xl backdrop-blur-md border-2 border-[#475569] transition ease-in-out delay-300 hover:backdrop-blur-2xl shadow-black/70 shadow-2xl w-[90%] md:w-[70%] lg:w-[25%] flex flex-col items-center">
                <h2 className="text-2xl lg:text-6xl pricedown text-[var(--lgold)] font-bold mb-6 text-center whitespace-nowrap">
                    Admin Login
                </h2>
                <form
                    onSubmit={handleSubmit}
                    className="flex justify-center space-x-2"
                >
                    {passkey.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            className="w-12 h-12 text-center rounded-lg bg-[var(--opac)] backdrop-blur-sm text-[var(--ltext)] border-2 border-[var(--lblue)] focus:outline-none focus:border-[var(--lgold)]"
                        />
                    ))}
                    <button
                        type="submit"
                        className="p-3 bg-[var(--lblue)] glassgrad2 shadow-black/70 shadow-2xl backdrop-blur-sm font-medium text-[var(--ltext)] hover:text-[var(--bg2)] rounded-lg hover:bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin
