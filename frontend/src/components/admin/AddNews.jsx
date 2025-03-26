import React, {useState, useEffect} from 'react'
import {FaPlus, FaTrash, FaEdit} from 'react-icons/fa'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'

const AddNews = () => {
    const {register, handleSubmit, reset} = useForm()
    const [news, setNews] = useState([])
    const [newNews, setNewNews] = useState({
        image: null,
        title: '',
        description: '',
    })
    const [isEditing, setIsEditing] = useState(false)
    const [currentNews, setCurrentNews] = useState(null)
    const [expandedNews, setExpandedNews] = useState({}) // Track expanded state

    const fetchAnnouncements = async () => {
        try {
            const response = await axios.get('/api/v1/announcement')
            setNews(response.data.data)
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        fetchAnnouncements()
    }, [])

    const addNews = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            if (newNews.image instanceof File) {
                formData.append('image', newNews.image)
            }
            formData.append('title', newNews.title)
            formData.append('description', newNews.description)

            if (isEditing && currentNews) {
                await axios.put(
                    `/api/v1/announcement/update-announcement/${currentNews._id}`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                        withCredentials: true,
                    },
                )
                toast.success('News updated successfully')
            } else {
                await axios.post('/api/v1/announcement', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true,
                })
                toast.success('New news added successfully')
            }
            fetchAnnouncements()
        } catch (err) {
            console.log(err.message)
        } finally {
            setNewNews({
                image: null,
                title: '',
                description: '',
            })
            setIsEditing(false)
            setCurrentNews(null)
        }
    }

    const handleChange = (e) => {
        setNewNews({
            ...newNews,
            [e.target.name]: e.target.value,
        })
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setNewNews({
            ...newNews,
            image: file,
        })
    }

    const editNews = (newsItem) => {
        setIsEditing(true)
        setCurrentNews(newsItem)
        setNewNews({
            image: newsItem.image,
            title: newsItem.title,
            description: newsItem.description,
        })
    }

    const deleteNews = async (id) => {
        try {
            await axios.delete(`/api/v1/announcement/delete-announcement/${id}`)
            toast.success('News deleted successfully')
            fetchAnnouncements()
        } catch (err) {
            console.log(err.message)
        }
    }

    const toggleExpand = (id) => {
        setExpandedNews((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }))
    }

    return (
        <div className="p-4 md:p-6 min-h-screen poppins dark:bg-gray-100 bg-[var(--bg2)]">
            <div className="mb-6 rounded-2xl shadow-black/70 dark:shadow-black/10 bg-[var(--bg1)] dark:bg-gray-100 dark:border-gray-400 border-[1px] border-[var(--opac)] shadow-2xl">
                <h2 className="text-2xl rounded-xl font-medium m-2 p-2 text-[var(--lgold)] dark:text-[var(--dltext)] text-center dark:shadow-black/10 shadow-black/70 dark:bg-gray-100 dark:border-gray-400 bg-[var(--bg1)] border-[1px] border-[var(--opac)] shadow-2xl">
                    {isEditing ? 'Edit News' : 'Add News'}
                </h2>
                <form
                    className="grid grid-cols-1 gap-5 md:grid-cols-2 p-5"
                    onSubmit={addNews}
                >
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-500 pb-2">
                            Upload Image
                        </label>
                        <div className="relative">
                            <input
                                type="file"
                                accept="image/*"
                                {...register('image')}
                                onChange={handleImageChange}
                                id="file-input"
                                className="hidden"
                                required={!isEditing}
                            />
                            <label
                                htmlFor="file-input"
                                className="cursor-pointer p-2 border-[1px] border-[var(--opac)] dark:border-gray-300 h-[40px] rounded-md bg-[var(--opac)] dark:bg-gray-100 backdrop-blur-md shadow-black/30 dark:shadow-none shadow-md text-gray-200 dark:text-[var(--dltext)] flex "
                            >
                                <p className="bg-[var(--opac)] dark:bg-gray-100 border-[1px] text-xs md:px-3 px-1 p-1 border-[var(--opac)] dark:border-gray-300 rounded-sm shadow-md">
                                    Choose File
                                </p>
                            </label>
                        </div>
                        {newNews.image && (
                            <img
                                src={
                                    newNews.image instanceof File
                                        ? URL.createObjectURL(newNews.image)
                                        : newNews.image
                                }
                                alt="Uploaded"
                                className="mt-2 h-40 object-contain"
                            />
                        )}
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-500 pb-2">
                            Enter the news title
                        </label>
                        <input
                            type="text"
                            {...register('title', {required: true})}
                            value={newNews.title}
                            onChange={handleChange}
                            placeholder="News Title"
                            className="p-2 border-[1px] border-[var(--opac)] dark:border-gray-300 h-[40px] rounded-md bg-[var(--opac)] dark:bg-gray-100 backdrop-blur-md shadow-black/30 dark:shadow-none shadow-md text-gray-200 dark:text-[var(--dltext)]"
                            required
                        />
                    </div>
                    <div className="flex flex-col col-span-2">
                        <label className="text-sm text-gray-500 pb-2">
                            Provide the news description
                        </label>
                        <textarea
                            {...register('description', {required: true})}
                            value={newNews.description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="p-2 border-[1px] border-[var(--opac)] dark:border-gray-300 h-[40px] rounded-md bg-[var(--opac)] dark:bg-gray-100 backdrop-blur-md shadow-black/30 dark:shadow-none shadow-md text-gray-200 dark:text-[var(--dltext)]"
                            required
                        />
                    </div>
                    <div className="md:col-span-2 flex justify-center">
                        <button
                            type="submit"
                            className="p-2 px-5 border-[1px] border-[var(--opac)] h-[40px] rounded-md bg-[var(--bg4op)] dark:bg-[var(--bg1l)] backdrop-blur-md shadow-black/30 hover:shadow-black/40 hover:bg-[var(--opac)] hover:dark:bg-[var(--bg1)] shadow-md hover:shadow-xl text-gray-200 flex items-center justify-center"
                        >
                            {isEditing ? 'Update News' : 'Add News'}{' '}
                            <FaPlus className="ml-2" />
                        </button>
                    </div>
                </form>
            </div>
            <div className="mb-6 rounded-2xl shadow-black/70 dark:shadow-black/10 bg-[var(--bg1)] dark:bg-gray-100 dark:border-gray-400 border-[1px] border-[var(--opac)] shadow-2xl">
                <h2 className="text-2xl rounded-xl font-medium m-2 p-2 text-[var(--lgold)] dark:text-[var(--dltext)] text-center dark:shadow-black/10 shadow-black/70 dark:bg-gray-100 dark:border-gray-400 bg-[var(--bg1)] border-[1px] border-[var(--opac)] shadow-2xl">
                    Current News
                </h2>
                <div className="m-4 grid grid-cols-1 md:grid-cols-2 overflow-y-scroll lg:grid-cols-4 gap-6">
                    {news.map((newsItem) => (
                        <div
                            key={newsItem._id}
                            className="p-4 border-[1px] border-[var(--opac)] dark:border-gray-300 rounded-lg bg-[var(--opac)] dark:bg-gray-100 dark:shadow-none shadow-md"
                        >
                            <img
                                src={newsItem.image}
                                alt="News"
                                className="w-full h-32 object-cover rounded-md mb-2"
                            />
                            <h3 className="font-bold text-md text-[var(--lblue)] my-2 dark:text-[var(--dltext)]">
                                {newsItem.title}
                            </h3>
                            <p className="text-gray-400 text-sm dark:text-gray-600">
                                {expandedNews[newsItem._id]
                                    ? newsItem.description
                                    : newsItem.description.slice(0, 110) +
                                      '... '}
                                <button
                                    className="text-blue-500 text-sm"
                                    onClick={() => toggleExpand(newsItem._id)}
                                >
                                    {expandedNews[newsItem._id]
                                        ? 'Show Less'
                                        : 'Read More'}
                                </button>
                            </p>

                            <div className="mt-4 flex justify-between">
                                <button
                                    className="text-blue-500"
                                    onClick={() => editNews(newsItem)}
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    className="text-red-500"
                                    onClick={() => deleteNews(newsItem._id)}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AddNews
