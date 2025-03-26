import React, {useState, useEffect} from 'react'
import {FaPlus} from 'react-icons/fa'
import axios from 'axios'
import toast from 'react-hot-toast'

const AdminAddCriminal = () => {
    const [newCriminal, setNewCriminal] = useState({
        user: '',
        image: null,
        crime: '',
        rating: '',
        aliases: '',
    })
    const [criminals, setCriminals] = useState([])

    const handleChange = (e) => {
        const {name, value, type, files} = e.target
        if (type === 'file') {
            setNewCriminal((prevCriminal) => ({
                ...prevCriminal,
                [name]: files[0],
            }))
        } else {
            setNewCriminal((prevCriminal) => ({
                ...prevCriminal,
                [name]: value,
            }))
        }
    }

    const handleAddCriminal = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('image', newCriminal.image)
        formData.append('user', newCriminal.user)
        formData.append('crime', newCriminal.crime)
        formData.append('rating', newCriminal.rating)
        formData.append('aliases', newCriminal.aliases)

        try {
            const response = await axios.post(
                '/api/v1/wanted/addWantedUser',
                formData,
                {
                    withCredentials: true,
                    headers: {'Content-Type': 'multipart/form-data'},
                },
            )
            console.log(response.data)
            toast.success('Criminal added successfully!')
            fetchCriminals() // Refresh the list after adding a new criminal
        } catch (error) {
            console.error(
                'Error adding criminal:',
                error.response ? error.response.data : error.message,
            )
            toast.error('Failed to add criminal.')
        } finally {
            setNewCriminal({
                user: '',
                image: null,
                crime: '',
                rating: '',
                aliases: '',
            })
        }
    }


    const fetchCriminals = async () => {
        try {
            const response = await axios.get(
                '/api/v1/wanted/fetch-wantedUsers',
                {
                    withCredentials: true,
                },
            )
            setCriminals(response.data.data)
        } catch (error) {
            console.error('Error fetching criminals:', error)
        }
    }

    useEffect(() => {
        fetchCriminals()
    }, [])

    return (
        <div className="p-4 md:p-6 poppins dark:bg-gray-100 bg-[var(--bg2)] min-h-screen">
            <div className="mb-6 rounded-2xl shadow-black/70 dark:shadow-black/10 bg-[var(--bg1)] dark:bg-gray-100 dark:border-gray-400 border-[1px] border-[var(--opac)] shadow-2xl">
                <h2 className="text-2xl rounded-xl font-medium m-2 p-2 text-[var(--lgold)] dark:text-[var(--dltext)] text-center dark:shadow-black/10 shadow-black/70 dark:bg-gray-100 dark:border-gray-400 bg-[var(--bg1)] border-[1px] border-[var(--opac)] shadow-2xl">
                    Add Criminal
                </h2>
                <form
                    className="grid grid-cols-1 gap-5 md:grid-cols-2 p-5"
                    onSubmit={handleAddCriminal}
                >
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-500 pb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            name="user"
                            value={newCriminal.user}
                            onChange={handleChange}
                            placeholder="Name"
                            className="p-2 border-[1px] border-[var(--opac)] dark:border-gray-300 h-[40px] rounded-md bg-[var(--opac)] dark:bg-gray-100 backdrop-blur-md shadow-black/30 dark:shadow-none shadow-md text-gray-200 dark:text-[var(--dltext)]"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm text-gray-500 pb-2">
                            Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            name="image"
                            onChange={handleChange}
                            id="file-input"
                            required
                        />
                        {newCriminal.image && (
                            <img
                                src={URL.createObjectURL(newCriminal.image)}
                                alt="Uploaded"
                                className="mt-2 h-40 object-contain"
                            />
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm text-gray-500 pb-2">
                            Crime
                        </label>
                        <input
                            type="text"
                            name="crime"
                            value={newCriminal.crime}
                            onChange={handleChange}
                            placeholder="Crime"
                            className="p-2 border-[1px] border-[var(--opac)] dark:border-gray-300 h-[40px] rounded-md bg-[var(--opac)] dark:bg-gray-100 backdrop-blur-md shadow-black/30 dark:shadow-none shadow-md text-gray-200 dark:text-[var(--dltext)]"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm text-gray-500 pb-2">
                            Rating
                        </label>
                        <input
                            type="number"
                            name="rating"
                            value={newCriminal.rating}
                            onChange={handleChange}
                            placeholder="Rating"
                            className="p-2 border-[1px] border-[var(--opac)] dark:border-gray-300 h-[40px] rounded-md bg-[var(--opac)] dark:bg-gray-100 backdrop-blur-md shadow-black/30 dark:shadow-none shadow-md text-gray-200 dark:text-[var(--dltext)]"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm text-gray-500 pb-2">
                            Aliases
                        </label>
                        <input
                            type="text"
                            name="aliases"
                            value={newCriminal.aliases}
                            onChange={handleChange}
                            placeholder="Aliases"
                            className="p-2 border-[1px] border-[var(--opac)] dark:border-gray-300 h-[40px] rounded-md bg-[var(--opac)] dark:bg-gray-100 backdrop-blur-md shadow-black/30 dark:shadow-none shadow-md text-gray-200 dark:text-[var(--dltext)]"
                        />
                    </div>

                    <div className="md:col-span-2 flex justify-center">
                        <button
                            type="submit"
                            className="p-2 px-5 border-[1px] border-[var(--opac)] h-[40px] rounded-md bg-[var(--bg4op)] dark:bg-[var(--bg1l)] backdrop-blur-md shadow-black/30 hover:shadow-black/40 hover:bg-[var(--opac)] hover:dark:bg-[var(--bg1)] shadow-md hover:shadow-xl text-gray-200 flex items-center justify-center"
                        >
                            Add Criminal <FaPlus className="ml-2" />
                        </button>
                    </div>
                </form>
            </div>

            <div className="mb-6 rounded-2xl shadow-black/70 dark:shadow-black/10 bg-[var(--bg1)] dark:bg-gray-100 dark:border-gray-400 border-[1px] border-[var(--opac)] shadow-2xl">
                <h2 className="text-2xl rounded-xl font-medium m-2 p-2 text-[var(--lgold)] dark:text-[var(--dltext)] text-center dark:shadow-black/10 shadow-black/70 dark:bg-gray-100 dark:border-gray-400 bg-[var(--bg1)] border-[1px] border-[var(--opac)] shadow-2xl">
                    Most Wanted Criminals
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 p-5">
                    {criminals.map((criminal) => (
                        <div
                            key={criminal._id}
                            className="md:p-4 p-3 bg-[var(--opac)] dark:bg-gray-100 border-[1px] border-[var(--opac)] dark:border-gray-300 rounded-lg shadow-black/30 dark:shadow-none shadow-md"
                        >
                            <img
                                className="text-sm text-gray-500 w-full md:h-72 h-48 mb-3 object-cover object-top dark:text-gray-600 rounded-md"
                                src={criminal.image}
                                alt={criminal.user}
                            />
                            <div className="flex justify-between">
                                <h3 className="md:text-lg text-md font-semibold text-gray-200 dark:text-[var(--dltext)]">
                                    {criminal.user}
                                </h3>
                                <div className="md:text-md text-sm font-regular text-gray-200 dark:text-[var(--dltext)]">
                                    {criminal.rating}
                                </div>
                            </div>
                            <p className="text-sm text-gray-200 dark:text-[var(--dltext)]">
                                {criminal.crime}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-[var(--dltext)]">
                                Aliases: {criminal.aliases}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdminAddCriminal

