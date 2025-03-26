import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {toast} from 'react-hot-toast'

const AdminShowCrime = () => {
    const [complaints, setComplaints] = useState([])

    useEffect(() => {
        fetchComplaints()
    }, [])

    const fetchComplaints = async () => {
        try {
            const res = await axios.get('/api/v1/reportCrime/report-crime', {
                withCredentials: true,
            })
            setComplaints(res.data.data) // Adjusted to handle the ApiResponse structure
            toast.success('Complaints fetched successfully!')
        } catch (error) {
            console.error(error)
            toast.error('Error fetching complaints.')
        }
    }

    return (
        <div className="p-4 md:p-6 poppins min-h-screen dark:bg-gray-100 bg-[var(--bg2)]">
            <div className="mb-6 rounded-2xl shadow-black/70 dark:shadow-black/10 bg-[var(--bg1)] dark:bg-gray-100 dark:border-gray-400 border-[1px] border-[var(--opac)] shadow-2xl">
                <h2 className="text-2xl rounded-xl font-medium m-2 p-2 text-[var(--lgold)] dark:text-[var(--dltext)] text-center dark:shadow-black/10 shadow-black/70 dark:bg-gray-100 dark:border-gray-400 bg-[var(--bg1)] border-[1px] border-[var(--opac)] shadow-2xl">
                    All Reported Crimes
                </h2>
                {complaints.length > 0 ? (
                    <ul className="p-5">
                        {complaints.map((complaint) => (
                            <li
                                key={complaint._id}
                                className="p-3 border-b-[1px] border-[var(--opac)] dark:border-gray-300"
                            >
                                <p>
                                    <strong>User Name:</strong>{' '}
                                    {complaint.user.name}
                                </p>
                                <p>
                                    <strong>Complaint:</strong>{' '}
                                    {complaint.complaint}
                                </p>
                                <p>
                                    <strong>Location:</strong>{' '}
                                    {complaint.location}
                                </p>
                                <p>
                                    <strong>Description:</strong>{' '}
                                    {complaint.description}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center p-5">No complaints found.</p>
                )}
            </div>
        </div>
    )
}

export default AdminShowCrime
