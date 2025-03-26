import React, {useEffect, useState} from 'react'
import axios from 'axios'
import * as AiIcons from 'react-icons/ai'

const JobApplication = () => {
    const [data, setData] = useState([])
    const [expandedId, setExpandedId] = useState(null) // Store the ID of the expanded application

    const fetchApplications = async () => {
        try {
            const response = await axios.get(
                '/api/v1/application/fetch-application',
                {
                    withCredentials: true,
                },
            )
            console.log(response.data.data)
            setData(response.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchApplications()
    }, [])

    const applicationControl = async (id, type) => {
        try {
            const response = await axios.get(
                `/api/v1/application/${type}-application/${id}`,
            )
            fetchApplications()
            console.log(response)
        } catch (err) {
            console.log(err)
        }
    }

    const handleExpandClick = (id) => {
        setExpandedId(expandedId === id ? null : id)
    }

    return (
        <div className="poppins bg-[var(--bg1)] poppins dark:bg-[var(--dbg2)] p-3 md:p-8 min-h-screen w-full items-center justify-center">
            <h1 className="text-3xl font-bold text-[var(--lgold)] dark:text-[var(--dltext)] text-center mb-5">
                Job Applications
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 gap-1">
                {data.map((application) => {
                    const job = application.job[0] // Assume there's only one job per application
                    return (
                        <div
                            key={application._id}
                            className="bg-[var(--opac)] dark:bg-gray-100 md:p-5 p-3 rounded-xl border-[1px] border-[var(--opac)] dark:border-gray-300 shadow-md mb-5"
                        >
                            <div className="mb-5 text-gray-300 dark:text-gray-600">
                                <h2 className="md:text-xl text-md font-semibold mb-2 text-[var(--lgold)] dark:text-[var(--dltext)]">
                                    Application ID: {application._id}
                                    <p className="mb-1">
                                        <strong>Name:</strong>{' '}
                                        {application.user.name}
                                    </p>
                                </h2>
                                {job ? (
                                    <>
                                        <p className="mb-1 md:text-lg text-sm">
                                            {job.title}
                                            <span className="mr-3">|</span>
                                            {job.location}
                                            <span className="mr-3">|</span>
                                            {job.jobType}
                                        </p>
                                        <button
                                            onClick={() =>
                                                handleExpandClick(
                                                    application._id,
                                                )
                                            }
                                            className="text-[var(--lgold)] dark:text-[var(--dltext)]  dark:border-[var(--dltext)] border-[1px] rounded-full border-[var(--lgold)] p-1 mt-1"
                                        >
                                            {expandedId === application._id ? (
                                                <AiIcons.AiFillCaretUp />
                                            ) : (
                                                <AiIcons.AiFillCaretDown />
                                            )}
                                        </button>
                                        {expandedId === application._id && (
                                            <div>
                                                <p className="mb-1">
                                                    <strong>
                                                        Description:
                                                    </strong>{' '}
                                                    {job.description}
                                                </p>
                                                <p className="mb-1">
                                                    <strong>
                                                        Requirements:
                                                    </strong>{' '}
                                                    {job.requirements[0]}
                                                </p>
                                                <p className="mb-1">
                                                    <strong>Salary:</strong>{' '}
                                                    {job.salaryRange}
                                                </p>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <p className="mb-1 md:text-lg text-sm text-red-500">
                                        Job information is not available.
                                    </p>
                                )}
                            </div>
                            <div className="flex">
                                <button
                                    onClick={() =>
                                        applicationControl(
                                            application._id,
                                            'approve',
                                        )
                                    }
                                    className="text-green-600 text-sm border-[1px] border-green-600 hover:border-blue-500 hover:text-blue-500 px-3 p-1 rounded-md"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() =>
                                        applicationControl(
                                            application._id,
                                            'disapprove',
                                        )
                                    }
                                    className="ml-4 text-sm text-red-600 border-[1px] border-red-600 hover:border-blue-500 hover:text-blue-500 px-3 p-1 rounded-md"
                                >
                                    Decline
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default JobApplication
