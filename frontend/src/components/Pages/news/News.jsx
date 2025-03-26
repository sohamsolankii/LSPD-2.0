import React, {useState, useEffect, useContext} from 'react'
import {
    FaThumbsUp,
    FaCommentAlt,
    FaArrowLeft,
    FaThumbsDown,
} from 'react-icons/fa'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {UserContext} from '../../../context/userContext'
import {Link, useNavigate} from 'react-router-dom'
import {IoCopyOutline} from 'react-icons/io5'

const News = () => {
    const [articles, setArticles] = useState([])
    const [selectedArticle, setSelectedArticle] = useState(null)
    const [comment, setComment] = useState('')
    const [fetchComment, setFetchComments] = useState([])
    const [code, setCode] = useState('')
    const {user} = useContext(UserContext)
    const navigate = useNavigate()

    const fetchArticles = async () => {
        try {
            const response = await axios.get('/api/v1/announcement')
            setArticles(response.data.data)
        } catch (error) {
            console.error('Error fetching articles:', error)
        }
    }

    useEffect(() => {
        fetchArticles()
    }, [])

    const fetchSpecificArticle = async (id) => {
        try {
            const response = await axios.get(`/api/v1/announcement/watch/${id}`)
            setSelectedArticle(response.data.data)
        } catch (error) {
            console.error('Error fetching article:', error)
        }
    }

    const fetchComments = async (id) => {
        try {
            const response = await axios.get(
                `/api/v1/comment/fetch-comment/${id}`,
            )
            setFetchComments(response.data.data)
        } catch (err) {
            console.error('Error fetching comments:', err.message)
        }
    }

    // const fetchPress = async () => {
    //     try {
    //         const response = await axios.get('/api/v1/press/get')
    //         console.log('Press code:', response.data.data)
    //     } catch (error) {
    //         console.error('Error fetching press:', error)
    //     }
    // }

    useEffect(() => {
        const fetchPress = async () => {
            try {
                const response = await axios.get('/api/v1/press/get')
                if (!response) {
                    setCode(0)
                }
                setCode(response.data.data.code)
                console.log('Press code:', response.data.data.code)
            } catch (error) {
                console.error('Error fetching press:', error)
            }
        }
        fetchPress()
    })

    const handleClick = (article) => {
        fetchComments(article._id)
        setSelectedArticle(article)
    }

    const handleBack = () => {
        setSelectedArticle(null)
    }

    const handleLike = async (id) => {
        if (!user) {
            toast.error('You Have to login first!')
            navigate('/login')
        } else {
            try {
                // console.log('handle like', ${id})
                // console.log('user id', user._id)
                const userId = user._id
                const response = await axios.get(
                    '/api/v1/announcement/add-like',
                    {
                        params: {
                            id: id,
                            userId: userId,
                        },
                        withCredentials: true,
                    },
                )
                // toast.success('Article liked successfully!')
                fetchSpecificArticle(id) // Update the specific article after like
            } catch (error) {
                toast.error('Error liking article.')
                console.error('Error liking article:', error)
            } finally {
                fetchArticles() // Fetch all articles to update the list
            }
        }
    }
    const handledislike = async (id) => {
        if (!user) {
            toast.error('You Have to login first!')
            navigate('/login')
        } else {
            try {
                const userId = user._id

                const response = await axios.get(
                   ` /api/v1/announcement/add-dislike`,
                    {
                        params: {
                            id: id,
                            userId: userId,
                        },
                        withCredentials: true,
                    },
                )
                // toast.success('Article liked successfully!')
                fetchSpecificArticle(id) // Update the specific article after like
            } catch (error) {
                toast.error('Error liking article.')
                console.error('Error liking article:', error)
            } finally {
                fetchArticles() // Fetch all articles to update the list
            }
        }
    }

    const handleComment = async (id) => {
        if (!user) {
            toast.error('You Have to login first!')
            navigate('/login')
        } else {
            if (comment.trim() === '') return

            try {
                const res = await axios.post(
                    `/api/v1/comment/add-comment/${id}`,
                    {comment},
                    {withCredentials: true},
                )
                fetchComments(id)
                toast.success('Comment added successfully!')
                setComment('')
            } catch (error) {
                toast.error('Error adding comment.')
                console.error('Error adding comment:', error)
            }
        }
    }

    return (
        <div className="w-full mx-auto p-4 md:p-6 lg:p-8 min-h-screen bg-[var(--bg1)] poppins dark:bg-gray-200">
            {selectedArticle ? (
                <div className="bg-[var(--opac)] dark:bg-gray-100 border-[1px] border-[var(--opac2)] dark:border-gray-300 rounded-lg shadow-lg overflow-hidden">
                    <div className="p-4 md:p-6 flex items-center justify-between bg-[var(--opac)] dark:bg-white border-b border-[var(--opac2)] dark:border-gray-300">
                        <button
                            onClick={handleBack}
                            className="flex items-center p-2 px-4 border border-[var(--bg1)] dark:border-gray-300 rounded-md bg-[var(--lblue)] dark:bg-[var(--dltext)] text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500 transition"
                        >
                            <FaArrowLeft className="mr-2" />
                            Back to News
                        </button>
                        <h2 className="text-xl md:text-2xl font-semibold text-[var(--lblue)] dark:text-[var(--dltext)]">
                            {selectedArticle.title}
                        </h2>
                    </div>
                    <div className="p-4 md:p-6">
                        <img
                            src={selectedArticle.image}
                            alt={selectedArticle.headline}
                            className="h-64 md:mr-5 md:mb-2 mb-0 mr-0 object-cover rounded-lg shadow-md float-left"
                        />
                        <div className="mt-4 text-gray-300 dark:text-gray-600 text-sm md:text-base">
                            {selectedArticle.description}
                        </div>
                    </div>
                    <div className="p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between border-t border-[var(--opac2)] dark:border-gray-300">
                        <div className="flex space-x-4 justify-between">
                            <button
                                onClick={() => handleLike(selectedArticle._id)}
                                className="flex items-center bg-blue-400 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition"
                            >
                                <FaThumbsUp className="mr-2" />
                                {selectedArticle.likes}
                            </button>
                            <button
                                onClick={() =>
                                    handledislike(selectedArticle._id)
                                }
                                className="flex items-center bg-red-400 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-600 transition"
                            >
                                <FaThumbsDown className="mr-2" />
                                {selectedArticle.dislikes}
                            </button>
                        </div>
                        <div className="mt-4 md:mt-0 flex items-center">
                            <input
                                type="text"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Add a comment"
                                className="rounded-l-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-4 py-2"
                            />
                            <button
                                onClick={() =>
                                    handleComment(selectedArticle._id)
                                }
                                className="bg-blue-500 text-white px-4 py-2 rounded-r-full flex items-center shadow-md hover:bg-blue-600 transition"
                            >
                                <FaCommentAlt className="mr-2" />
                                Comment
                            </button>
                        </div>
                    </div>
                    <div className="p-4 border-t border-[var(--opac2)] dark:border-gray-300">
                        {fetchComment.map((comment) => (
                            <div
                                key={comment._id}
                                className="border-b border-[var(--opac2)] dark:border-gray-300 py-2"
                            >
                                <div className="text-[var(--lgold)] dark:text-[var(--dltext)]">
                                    <strong>{comment.user.name}</strong>
                                </div>
                                <div className="text-sm text-gray-300 dark:text-gray-600">
                                    {comment.comment}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    {code && (
                        <div className="text-center mb-6 bg-[var(--opac)] dark:bg-gray-100 shadow-2xl border-[1px] border-[var(--opac)] dark:border-gray-300 dark:shadow-none rounded-xl p-4">
                            <h2 className=" text-4xl pricedown font-semibold text-[var(--lgold)] dark:text-[var(--dltext)]">
                                Live Press
                            </h2>

                            <div className="justify-between md:flex items-center mt-4 shadow-xl md:text-xl text-lg reflection border-[1px] border-[var(--opac)] dark:bg-gray-100 dark:shadow-none dark:border-gray-300 p-3 rounded-md">
                                <h3 className="font-bold text-gray-300 dark:text-gray-600 md:mb-0 mb-4">
                                    Meeting is live now. To join a meeting,
                                    please use the code provided to you.
                                </h3>

                                <div className="flex justify-end">
                                    <div className="w-full max-w-[16rem]">
                                        <div className="flex mr-4">
                                            <input
                                                type="text"
                                                name="npm-install-copy-button"
                                                id="npm-install-copy-button"
                                                readOnly
                                                className="w-[100%] p-1 px-2 border-gray-300 bg-[var(--opac)] text-lg border-y-[1px] border-l-[1px] border-gray-300 text-gray-300  dark:border-gray-600 dark:text-gray-600 rounded-l-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                                                value={code}
                                            />
                                            <button
                                                className="p-1 px-2 text-sm font-medium rounded-r-md border-[1px] border-gray-300 text-gray-300  dark:border-gray-600 dark:text-gray-600 focus:outline-none"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(
                                                        code,
                                                    )
                                                    toast.success(
                                                        'Meeting Code copied to clipboard!',
                                                    )
                                                }}
                                            >
                                                <IoCopyOutline />
                                            </button>
                                        </div>
                                    </div>
                                    <Link to="/press">
                                        <button className="rounded-md border-[1px] border-gray-300 text-gray-300 dark:border-gray-600 dark:text-gray-600 text-sm px-4 p-2">
                                            Join
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="text-center mb-6">
                        <h2 className="text-4xl pricedown font-semibold text-[var(--lgold)] dark:text-[var(--dltext)]">
                            News and Alerts
                        </h2>
                        <p className="text-lg poppins text-gray-200 dark:text-[var(--dlblue)] mt-2">
                            Stay updated with all news of Los Santos!
                        </p>
                    </div>
                    <div className="grid grid-cols-1 poppins md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {articles.map((article) => (
                            <div
                                key={article._id}
                                className="bg-[var(--opac)] dark:bg-white border-[1px] border-[var(--opac)] dark:border-gray-300 rounded-xl shadow-2xl shadow-black/50 dark:shadow-none dark:shadow-black/20 p-2 overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
                                onClick={() => handleClick(article)}
                            >
                                <img
                                    src={article.image}
                                    alt={article.headline}
                                    className="w-full h-40 object-cover rounded-lg"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-medium text-gray-200 dark:text-[var(--bg1l)]">
                                        {article.title}
                                    </h3>
                                    <hr className="w-full h-px my-3 bg-[var(--opac2)] border-0 dark:bg-gray-400" />
                                    <div className="flex justify-between mt-2 text-sm text-[var(--opac2)] dark:text-gray-400">
                                        <div className="flex justify-between">
                                            <div className="flex items-center mr-4">
                                                <FaThumbsUp className="mr-1" />
                                                {article.likes}
                                            </div>
                                            <div className="flex items-center mr-4">
                                                <FaThumbsDown className="mr-1" />
                                                {article.dislikes}
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <FaCommentAlt className="mr-1" />
                                            {article.comments.length}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default News