import React, {useEffect, useState} from 'react'
import StarRating from './UsedComponents/StarRating.jsx'
import * as FaIcons from 'react-icons/fa'
import axios from 'axios'
import {FaUserFriends} from 'react-icons/fa'
import {LuScanFace} from 'react-icons/lu'
import { Link } from 'react-router-dom'

const Wanted = () => {
    const [search, setSearch] = useState('')
    const [data, setData] = useState([])
    const [selectedCriminal, setSelectedCriminal] = useState(null)

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const fetchData = async () => {
        try {
            const response = await axios.get(
                '/api/v1/wanted/fetch-wantedUsers',
                {
                    withCredentials: true,
                },
            )
            console.log(response.data.data)
            setData(response.data.data)
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleSeeMore = (criminal) => {
        setSelectedCriminal(criminal)
        console.log('selected user: ', criminal)
    }

    const handleCloseDetails = () => {
        setSelectedCriminal(null)
    }

    const filteredData = data.filter(
        (criminal) =>
            criminal.user &&
            criminal.user.toLowerCase().includes(search.toLowerCase()),
    )

    return (
        <div className="p-4 md:p-6 min-h-screen poppins bg-cover dark:bg-gray-100 bg-[var(--bg2)]">
            <div className="mb-6 rounded-2xl shadow-black/70 dark:shadow-black/10 bg-[var(--bg1)] dark:bg-gray-100 dark:border-gray-400 border-[1px] border-[var(--opac)] shadow-2xl">
                <h2 className="text-2xl rounded-xl font-medium m-2 p-2 text-[var(--lgold)] dark:text-[var(--dltext)] text-center dark:shadow-black/10 shadow-black/70 bg-[var(--bg1)] dark:bg-gray-100 border-[1px] border-[var(--opac)] dark:border-gray-400 shadow-2xl">
                    Most Wanted Criminals
                </h2>

                <div className="md:p-5 p-3">
                    <div className="flex flex-col justify-between md:flex-row gap-4 mb-5">
                        <div className="flex flex-col w-full md:w-1/3">
                            <label className="text-sm text-gray-500 pb-2">
                                Search
                            </label>
                            <input
                                type="text"
                                placeholder="Search by name"
                                value={search}
                                onChange={handleSearchChange}
                                className="p-2 border-[1px] border-[var(--opac)] dark:border-gray-300 h-[40px] rounded-md bg-[var(--opac)] dark:bg-gray-100 backdrop-blur-md shadow-black/30 dark:shadow-none shadow-md text-gray-200 dark:text-[var(--dltext)]"
                            />
                        </div>
                        <div className="flex flex-col w-full md:w-1/6">
                            <label className="text-sm text-gray-500 pb-2">
                                Match faces of criminals using
                            </label>
                            <Link to='/face' 
                                className="p-2 border-[1px] border-[var(--opac)]
                            dark:border-gray-300 h-[40px] rounded-md
                            bg-[var(--opac)] dark:bg-gray-100 backdrop-blur-md
                            shadow-black/30 dark:shadow-none shadow-md
                            text-gray-200 dark:text-[var(--dltext)]"
                            >
                                Face Recognition
                            </Link>
                        </div>
                    </div>

                    <div className="inline-flex items-center justify-center w-full">
                        <hr className="w-[90%] h-px my-8 bg-[var(--lgold)] border-0 dark:bg-[var(--dltext)]" />
                        <span className="absolute invisible md:visible px-3 font-medium text-[var(--lgold)] -translate-x-1/2 bg-[var(--bg1)] left-1/2 dark:text-[var(--dltext)] dark:bg-gray-100">
                            Never forget their faces
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                        {filteredData.map((criminal) => (
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
                                        <StarRating
                                            crimeRate={criminal.rating}
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleSeeMore(criminal)}
                                    className="mt-4 text-blue-500 border-blue-500 border-[1px] rounded-md px-3 py-1 text-sm hover:text-blue-700 hover:border-blue-700"
                                >
                                    See More
                                    <FaIcons.FaChevronDown className="inline ml-1" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {selectedCriminal && (
                <div className="fixed inset-0 text-gray-300 dark:text-gray-600 flex items-center justify-center z-10">
                    <div className="bg-[var(--bg1lop)] dark:bg-[var(--opac)] backdrop-blur-3xl border-[1px] border-[var(--opac)] animate appear blockanim dark:border-gray-400 md:p-6 p-3 rounded-xl lg:w-[85%] shadow-black/80 dark:shadow-black/40 shadow-2xl w-[94%]">
                        <h2 className="text-xl font-medium mb-2 text-center">
                            Criminal Details
                        </h2>
                        <div className="flex items-center gap-4 md:grid-cols-3 grid-cols-1 justify-center rounded-lg p-4">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 border-[1px] dark:border-gray-400 flex justify-center items-center rounded-full">
                                    <FaIcons.FaUserTie />
                                </div>
                                <div>
                                    <p className="font-light text-xs">Name</p>
                                    <p className="md:text-lg text-md">
                                        {selectedCriminal.user}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 border-[1px] dark:border-gray-400 flex justify-center items-center rounded-full">
                                    <FaIcons.FaUserTag />
                                </div>
                                <div>
                                    <p className="font-light text-xs">
                                        Crime Rate
                                    </p>
                                    <StarRating
                                        crimeRate={selectedCriminal.rating}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 border-[1px] dark:border-gray-400 flex justify-center items-center rounded-full">
                                    <FaIcons.FaLocationArrow />
                                </div>
                                <div>
                                    <p className="font-light text-xs">Crimes</p>
                                    <p className="md:text-lg text-md">
                                        {selectedCriminal.crime}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 border-[1px] dark:border-gray-400 flex justify-center items-center rounded-full">
                                    <FaUserFriends />
                                </div>
                                <div>
                                    <p className="font-light text-sm">
                                        Aliases
                                    </p>
                                    <p className="md:text-lg text-md">
                                        {selectedCriminal.aliases}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <button
                            className="mt-4 text-blue-500 px-4 py-1 shadow-black/40 border-[1px] hover:text-white border-blue-500 dark:shadow-black/10 dark:shadow-md shadow-xl rounded-full hover:bg-blue-700"
                            onClick={handleCloseDetails}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Wanted
