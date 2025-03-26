import axios from 'axios'
import React, {useEffect, useState, useRef} from 'react'
import {toast} from 'react-hot-toast'
import * as FaIcons from 'react-icons/fa'

const AdminShowReport = () => {
    const [complaints, setComplaints] = useState([])
    const fetchedRef = useRef(false)

    useEffect(() => {
        if (!fetchedRef.current) {
            fetchComplaints()
            fetchedRef.current = true
        }
    }, [])

    const fetchComplaints = async () => {
        try {
            const res = await axios.get('/api/v1/reportCrime/report-crime', {
                withCredentials: true,
            })
            setComplaints(res.data.data)
            // toast.success('Complaints fetched successfully!')
        } catch (error) {
            console.error(error)
            toast.error('Error fetching complaints.')
        }
    }

    const [currentPage, setCurrentPage] = useState(1)
    const complaintsPerPage = 5

    const indexOfLastComplaint = currentPage * complaintsPerPage
    const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage
    const currentComplaints = complaints.slice(
        indexOfFirstComplaint,
        indexOfLastComplaint,
    )

    const nextPage = () => {
        if (currentPage < Math.ceil(complaints.length / complaintsPerPage)) {
            setCurrentPage(currentPage + 1)
        }
    }

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    return (
        <div className="bg-[var(--bg2)] poppins dark:bg-[var(--dbg2)] p-3 md:p-7 min-h-screen flex items-center justify-center">
            <div className="container bg-[var(--bg1)] dark:bg-[var(--dbg1)] mx-auto p-3 md:p-10 rounded-2xl dark:shadow-none shadow-black/70 border-[1px] border-[var(--opac)] dark:border-[var(--opac2)] shadow-2xl">
                <h1 className="text-2xl md:text-4xl pricedown font-bold text-[var(--lgold)] dark:text-[var(--dlgold)] mb-2 text-center">
                    All Reports
                </h1>
                <h2 className="text-sm md:text-xl poppins text-[var(--ltext)] dark:text-[var(--dltext)] mb-8 text-center">
                    Submitted by Users
                </h2>
                <div className="reports-list">
                    {currentComplaints.length === 0 ? (
                        <p className="text-center text-[var(--ltext)] dark:text-[var(--dltext)]">
                            No reports available
                        </p>
                    ) : (
                        currentComplaints.map((complaint, index) => (
                            <div
                                key={index}
                                className="mb-4 p-3 rounded-xl bg-[var(--opac)] border-[1px] border-[var(--opac)] shadow-black/20 shadow-lg backdrop-blur-sm dark:shadow-none dark:border-gray-400 bg-[var(--bg1l)] dark:bg-[var(--dbg1l)] text-[var(--ltext)] dark:text-[var(--dlblue)]"
                            >
                                <p className="font-medium text-lg">
                                    {complaint.complaint}
                                </p>
                                <p className="text-sm text-gray-400 dark:text-blue-600 mb-3">
                                    {complaint.description}
                                </p>

                                <p className="text-sm text-[var(--lblue)] dark:text-gray-800 flex items-center">
                                    {complaint.user ? (
                                        <>
                                            <FaIcons.FaUserTie className="mr-2" />{' '}
                                            {complaint.user.name}
                                        </>
                                    ) : (
                                        <>
                                            {' '}
                                            <FaIcons.FaUserSecret className="mr-2" />{' '}
                                            Anonymous
                                        </>
                                    )}
                                    {' | '}
                                    {complaint.location}
                                </p>
                            </div>
                        ))
                    )}
                </div>
                <div className="flex mt-4">
                    <button
                        className="bg-yellow-200 text-gray-800 dark:text-gray-200 dark:bg-gray-800 hover:bg-blue-500 dark:shadow-none shadow-black/70 shadow-lg hover:dark:bg-blue-700 p-3 mr-3 rounded-full"
                        onClick={prevPage}
                        disabled={currentPage === 1}
                    >
                        <FaIcons.FaArrowLeft />
                    </button>
                    <button
                        className="bg-yellow-200 text-gray-800 dark:text-gray-200 dark:bg-gray-800 hover:bg-blue-500 dark:shadow-none shadow-black/70 shadow-lg hover:dark:bg-blue-700 p-3 rounded-full"
                        onClick={nextPage}
                        disabled={
                            currentPage ===
                            Math.ceil(complaints.length / complaintsPerPage)
                        }
                    >
                        <FaIcons.FaArrowRight />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AdminShowReport
