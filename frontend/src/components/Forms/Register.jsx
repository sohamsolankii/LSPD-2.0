import React, {useContext, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {UserContext} from '../../context/userContext'
import Cookies from 'js-cookie' 

const Register = () => {
    const navigate = useNavigate()
    const { setUser } = useContext(UserContext)
    const [localData, setLocalData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const registerUser = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/api/v1/auth/signup', localData, {withCredentials: true})

            if (response.data.error) {
                toast.error(response.data.error)
            } else {
                setUser(response.data.user)
                setLocalData({
                    name: '',
                    email: '',
                    password: '',
                })
				Cookies.set('user', JSON.stringify(localData), {
                    expires: 7,
                })
                toast.success(
                    `Welcome, rookie! You've successfully registered. Let's keep Los Santos in check!`,
                    {
                        className:
                            'bg-[var(--opac)] mx-4 poppins pricedown font-medium text-[#94a3b8] rounded-lg shadow-md rounded-2xl backdrop-blur-sm border-1 border-[#475569] w-[80%] md:w-[60%] lg:w-[25%]',
                    },
                )
                navigate('/')
            }
        } catch (err) {
            console.log(err)
            toast.error(
                `Uh-oh, registration hit a snag! Give it another shot, rookie. The LSPD is waiting for you!`,
                {
                    className:
                        'bg-[var(--opac)] backdrop-blur-sm mx-4 poppins pricedown font-medium text-[#94a3b8] rounded-lg shadow-md rounded-2xl border-1 border-[#475569] w-[80%] md:w-[60%] lg:w-[25%]',
                },
            )
        }
    }

    return (
        <div
            className="poppins relative min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{backgroundImage: "url('/src/assets/formbg3.jpeg')"}}
        >
            <div className="absolute inset-0 bg-[var(--bg2)] opacity-80"></div>
            <div className="bg-[var(--bg3op)] relative z-10 p-8 text-[var(--lblue)] glassgrad rounded-2xl backdrop-blur-md border-2 border-[#475569] transition ease-in-out delay-300 hover:backdrop-blur-2xl shadow-black/70 shadow-2xl w-[90%] md:w-[70%] lg:w-[25%]">
                <h2 className="text-3xl lg:text-5xl pricedown text-[var(--lgold)] font-bold mb-6 text-center">
                    Register
                </h2>
                <form onSubmit={registerUser}>
                    <div className="mb-4">
                        <label className="block mb-2">Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full p-3 rounded-lg bg-[var(--opac)] backdrop-blur-sm text-[var(--ltext)]"
                            value={localData.name}
                            onChange={(e) =>
                                setLocalData({
                                    ...localData,
                                    name: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-3 rounded-lg bg-[var(--opac)] backdrop-blur-sm text-[var(--ltext)]"
                            value={localData.email}
                            onChange={(e) =>
                                setLocalData({
                                    ...localData,
                                    email: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full p-3 rounded-lg bg-[var(--opac)] backdrop-blur-sm text-[var(--ltext)]"
                            value={localData.password}
                            onChange={(e) =>
                                setLocalData({
                                    ...localData,
                                    password: e.target.value,
                                })
                            }
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 mt-8 bg-[var(--lblue)] font-medium text-[var(--bg2)] shadow-black/70 shadow-2xl rounded-lg hover:bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400"
                    >
                        Register
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <Link
                        to="/login"
                        className="text-[var(--lblue)] hover:text-[var(--lgold)]"
                    >
                        Already have an account? Login Now
                    </Link>
                </div>
                <div className="mt-2 text-center">
                    <Link
                        to="/admin-login"
                        className="text-[var(--lblue)] hover:text-[var(--lgold)]"
                    >
                        Admin
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Register
