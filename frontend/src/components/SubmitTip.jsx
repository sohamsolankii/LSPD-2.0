import React, {useContext, useState} from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {UserContext} from '../context/userContext'
import {useNavigate} from 'react-router-dom'

const SubmitTip = () => {
    const [tip, setTip] = useState('')
    const [isAnonymous, setIsAnonymous] = useState(false)
    const {user} = useContext(UserContext)
    const navigate = useNavigate()

    const handleTipChange = (e) => {
        setTip(e.target.value)
    }

    const handleCheckboxChange = () => {
        setIsAnonymous(!isAnonymous)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Reset the form
        setTip('')
        setIsAnonymous(false)

        if (user) {
            // * post request
            try {
                const response = await axios.post(
                    '/api/v1/tip',
                    {
                        message: tip,
                        isAnonymous: isAnonymous,
                    },
                    {
                        withCredentials: true,
                    },
                )
                console.log('this is tip response', response)
                toast('Thank you for helping out.', {
                    icon: '🫡',
                })
            } catch (error) {
                console.error('Error submitting tip', error)
            }
        } else {
            toast.error('You Have to login first!')
            navigate('/login')
        }
    }

    return (
        <div className="bg-[var(--bg2)] poppins dark:bg-gray-100 p-3 md:p-7 min-h-screen flex items-center justify-center">
            <div className="container bg-[var(--bg1)] dark:bg-white mx-auto p-3 md:p-10 rounded-2xl shadow-black/70 border-[1px] dark:shadow-black/20 dark:shadow-md border-[var(--opac)] dark:border-gray-300 shadow-2xl">
                <h1 className="text-2xl md:text-4xl pricedown font-bold text-[var(--lgold)] dark:text-[var(--dlgold)] mb-2 text-center">
                    Submit a Tip to LSPD
                </h1>
                <h2 className="text-sm md:text-xl poppins text-[var(--ltext)] dark:text-[var(--dltext)] mb-8 text-center">
                    Your information can help us keep Los Santos safe.
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2 md:mb-4">
                        <textarea
                            value={tip}
                            onChange={handleTipChange}
                            className="w-full h-32 md:h-48 p-3 rounded-xl glassgrad2 border-[1px] border-[var(--opac)] dark:border-gray-400 shadow-black/20 shadow-lg dark:shadow-none backdrop-blur-sm bg-[var(--bg1l)] dark:bg-[var(--dbg1l)] text-[var(--ltext)] dark:text-[var(--dlblue)]"
                            placeholder="Write your tip here..."
                            required
                        ></textarea>
                    </div>
                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            checked={isAnonymous}
                            onChange={handleCheckboxChange}
                            className="mr-2"
                        />
                        <label className="text-[var(--ltext)] dark:text-[var(--dltext)]">
                            Submit anonymously
                        </label>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-[var(--lblue)] md:mb-0 mb-5 text-[var(--bg1)] shadow-black/50 shadow-xl dark:shadow-none font-medium px-6 py-2 rounded-lg hover:bg-[var(--lgold)] transition ease-in-out duration-300"
                        >
                            Submit Tip
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SubmitTip
