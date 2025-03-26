import React, {useEffect, useState} from 'react'
import axios from 'axios'

const AdminShowTip = () => {
    const [tips, setTips] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchTips = async () => {
            try {
                const response = await axios.get('/api/v1/tip', {
                    withCredentials: true,
                })
                if (response.data && response.data.data) {
                    setTips(response.data.data)
                } else {
                    setError('Invalid response format')
                }
                setLoading(false)
            } catch (error) {
                setError(error.message)
                setLoading(false)
            }
        }

        fetchTips()
    }, [])

    const handleDelete = async (tipId) => {
        try {
            await axios.delete(`/api/v1/tip/${tipId}`, {
                withCredentials: true,
            })
            setTips(tips.filter((tip) => tip._id !== tipId))
        } catch (error) {
            setError(error.message)
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div className="bg-[var(--bg2)] poppins dark:bg-[var(--dbg2)] p-3 md:p-0 min-h-screen flex items-center justify-center">
            <div className="my-6 bg-[var(--bg1)] dark:bg-white rounded-2xl shadow-black/70 dark:shadow-black/30 border-[1px] border-[var(--opac)] dark:border-gray-300 shadow-2xl text-gray-100 dark:text-gray-800">
                <div className="container flex flex-col items-center mx-auto mb-8 md:p-10 md:px-12">
                    <h1 className="text-2xl md:text-4xl pricedown font-bold text-[var(--lgold)] dark:text-[var(--dltext)] mb-2 text-center">
                        All Tips
                    </h1>
                    <h2 className="text-sm md:text-xl poppins text-[var(--ltext)] dark:text-blue-900 text-center">
                        Submitted by Users
                    </h2>
                </div>
                <div className="container flex flex-col items-center justify-center mx-auto lg:flex-row lg:flex-wrap lg:justify-evenly lg:px-6">
                    {tips.length === 0 ? (
                        <p className="text-center text-[var(--ltext)] dark:text-[var(--dltext)]">
                            No tips available
                        </p>
                    ) : (
                        tips.map((tip, index) => (
                            <div
                                key={index}
                                className="relative flex flex-col max-w-sm mx-2 my-2 shadow-lg"
                            >
                                <div className="px-4 py-10 rounded-t-lg sm:px-2 md:px-4 bg-[var(--opac)] border-t-[1px] border-x-[1px] border-[var(--opac)] dark:border-blue-600 dark:bg-gray-50">
                                    <p className="relative px-3 py-1 md:text-lg text-md italic text-center text-gray-100 dark:text-gray-800">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                            fill="currentColor"
                                            className="w-6 h-6 text-[var(--opac2)] dark:text-blue-600"
                                        >
                                            <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                                            <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                                        </svg>
                                        {tip.tip}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                            fill="currentColor"
                                            className="absolute right-0 w-6 h-6 text-[var(--opac2)] dark:text-blue-600"
                                        >
                                            <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                                            <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                                        </svg>
                                    </p>
                                    <button
                                        onClick={() => handleDelete(tip._id)}
                                        className="absolute top-0 right-0 mt-2 mr-2 px-2 py-1 text-sm text-red-600 bg-red-100 rounded-full hover:bg-red-200"
                                    >
                                        Delete
                                    </button>
                                </div>
                                <div className="flex flex-col items-center justify-center shadow-black/30 shadow-lg dark:shadow-sm p-8 rounded-b-lg bg-[var(--opac2)] dark:bg-blue-600 text-gray-300 border-[1px] border-[var(--opac)] dark:text-gray-50">
                                    <img
                                        src="/src/assets/criminal.jpg"
                                        alt=""
                                        className="w-16 h-16 mb-2 -mt-16 bg-center bg-cover rounded-full  bg-gray-500 dark:bg-gray-500 bg-gray-700 dark:bg-gray-300"
                                    />
                                    <p className="md:text-lg text-md font-semibold leading-tight">
                                        {tip.user ? tip.user.name : 'Anonymous'}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default AdminShowTip
