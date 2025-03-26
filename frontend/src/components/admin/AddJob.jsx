import React, {useState} from 'react'
import {FaPlus, FaArrowLeft, FaArrowRight} from 'react-icons/fa'
import axios from 'axios'
import toast from 'react-hot-toast'

const AddJob = () => {
    const [jobs, setJobs] = useState([])
    const [newJob, setNewJob] = useState({
        title: '',
        location: '',
        jobType: '',
        description: '',
        requirements: '',
        salaryRange: '',
        applicationDeadline: '',
        contactEmail: '',
        postedDate: '',
        responsibilities: '',
    })
    const [currentPage, setCurrentPage] = useState(1)
    const jobsPerPage = 5

    const handleChange = (e) => {
        setNewJob({
            ...newJob,
            [e.target.name]: e.target.value,
        })
    }

    const handleAddJob = async () => {
        try {
            const response = await axios.post('/api/v1/job', newJob, {
                withCredentials: true,
            })
            toast.success('Job added successfully!')
            setJobs([...jobs, {...newJob, id: jobs.length + 1}])
            setNewJob({
                title: '',
                location: '',
                jobType: '',
                description: '',
                requirements: '',
                salaryRange: '',
                applicationDeadline: '',
                contactEmail: '',
                postedDate: '',
                responsibilities: '',
            })
        } catch (error) {
            console.error('Error adding job:', error)
        }
    }

    const handleDelete = (jobId) => {
        setJobs(jobs.filter((job) => job.id !== jobId))
    }

    const indexOfLastJob = currentPage * jobsPerPage
    const indexOfFirstJob = indexOfLastJob - jobsPerPage
    const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob)

    const prevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
    }

    const nextPage = () => {
        setCurrentPage((prevPage) =>
            Math.min(prevPage + 1, Math.ceil(jobs.length / jobsPerPage)),
        )
    }

    return (
        <div className="p-4 md:p-6 poppins dark:bg-gray-100 bg-[var(--bg2)] min-h-screen">
            <div className="mb-6 rounded-2xl shadow-black/70 dark:shadow-black/10 bg-[var(--bg1)] dark:bg-gray-100 dark:border-gray-400 border-[1px] border-[var(--opac)] shadow-2xl">
                <h2 className="text-2xl rounded-xl font-medium m-2 p-2 text-[var(--lgold)] dark:text-[var(--dltext)] text-center dark:shadow-black/10 shadow-black/70 dark:bg-gray-100 dark:border-gray-400 bg-[var(--bg1)] border-[1px] border-[var(--opac)] shadow-2xl">
                    Add Job
                </h2>
                <form
                    className="grid grid-cols-1 gap-5 md:grid-cols-2 p-5"
                    onSubmit={(e) => e.preventDefault()}
                >
                    {[
                        {
                            label: 'Job Title',
                            name: 'title',
                            type: 'text',
                            placeholder: 'Job Title',
                        },
                        {
                            label: 'Location',
                            name: 'location',
                            type: 'text',
                            placeholder: 'Location',
                        },
                        {
                            label: 'Job Type',
                            name: 'jobType',
                            type: 'select',
                            options: [
                                'FullTime',
                                'PartTime',
                                'Temporary',
                                'Contract',
                                'Internship',
                            ],
                        },
                        {
                            label: 'Description',
                            name: 'description',
                            type: 'textarea',
                            placeholder: 'Description',
                        },
                        {
                            label: 'Requirements',
                            name: 'requirements',
                            type: 'textarea',
                            placeholder: 'Requirements',
                        },
                        {
                            label: 'Responsibilities', // New field label
                            name: 'responsibilities', // New field name
                            type: 'textarea',
                            placeholder: 'Responsibilities',
                        },
                        {
                            label: 'Salary Range',
                            name: 'salaryRange',
                            type: 'text',
                            placeholder: 'Salary Range',
                        },
                        {
                            label: 'Application Deadline',
                            name: 'applicationDeadline',
                            type: 'date',
                        },
                        {
                            label: 'Contact Email',
                            name: 'contactEmail',
                            type: 'email',
                            placeholder: 'Contact Email',
                        },
                        {
                            label: 'Posted Date',
                            name: 'postedDate',
                            type: 'date',
                        },
                    ].map((field, index) => (
                        <div key={index} className="flex flex-col">
                            <label className="text-sm text-gray-500 pb-2">
                                {field.label}
                            </label>
                            {field.type === 'select' ? (
                                <select
                                    name={field.name}
                                    value={newJob[field.name]}
                                    onChange={handleChange}
                                    className="select-dropdown p-2 border-[1px] border-[var(--opac)] dark:border-gray-300 h-[40px] rounded-md bg-[var(--opac)] dark:bg-gray-100 backdrop-blur-md shadow-black/30 dark:shadow-none shadow-md text-gray-200 dark:text-[var(--dltext)]"
                                    required
                                >
                                    <option value="" disabled>
                                        Select {field.label}
                                    </option>
                                    {field.options.map((option, i) => (
                                        <option key={i} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            ) : field.type === 'textarea' ? (
                                <textarea
                                    name={field.name}
                                    value={newJob[field.name]}
                                    onChange={handleChange}
                                    placeholder={field.placeholder}
                                    className="p-2 border-[1px] border-[var(--opac)] dark:border-gray-300 h-[80px] rounded-md bg-[var(--opac)] dark:bg-gray-100 backdrop-blur-md shadow-black/30 dark:shadow-none shadow-md text-gray-200 dark:text-[var(--dltext)]"
                                    required
                                />
                            ) : (
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={newJob[field.name]}
                                    onChange={handleChange}
                                    placeholder={field.placeholder}
                                    className="p-2 border-[1px] border-[var(--opac)] dark:border-gray-300 h-[40px] rounded-md bg-[var(--opac)] dark:bg-gray-100 backdrop-blur-md shadow-black/30 dark:shadow-none shadow-md text-gray-200 dark:text-[var(--dltext)]"
                                    required
                                />
                            )}
                        </div>
                    ))}
                    <div className="md:col-span-2 flex justify-center">
                        <button
                            type="submit"
                            className="p-2 px-5 border-[1px] border-[var(--opac)] h-[40px] rounded-md bg-[var(--bg4op)] dark:bg-[var(--bg1l)] backdrop-blur-md shadow-black/30 hover:shadow-black/40 hover:bg-[var(--opac)] hover:dark:bg-[var(--bg1)] shadow-md hover:shadow-xl text-gray-200 flex items-center justify-center"
                            onClick={handleAddJob}
                        >
                            Add Job <FaPlus className="ml-2" />
                        </button>
                    </div>
                </form>
            </div>

            <div className="mb-6 dark:bg-gray-100 dark:border-gray-400 rounded-2xl shadow-black/70 dark:shadow-black/10 bg-[var(--bg1)] border-[1px] border-[var(--opac)] shadow-2xl">
                <h2 className="text-2xl rounded-xl z-10 font-medium dark:bg-gray-100 dark:border-gray-400 m-2 p-2 text-[var(--lgold)] text-center dark:text-[var(--dltext)] bg-[var(--bg1)] border-[1px] border-[var(--opac)] shadow-2xl">
                    Job List
                </h2>
                <ul className="p-5 space-y-2">
                    {currentJobs.map((job) => (
                        <li
                            key={job.id}
                            className="flex justify-between items-center p-2 border-b border-[var(--opac)] dark:border-gray-300"
                        >
                            <div>
                                <h3 className="font-semibold text-lg text-gray-200 dark:text-gray-900">
                                    {job.title}
                                </h3>
                                <p className="text-gray-500 text-sm dark:text-gray-600">
                                    {job.location}
                                </p>
                            </div>
                            <button
                                className="text-red-600 hover:text-red-800 border-[1px] border-red-600 hover:border-red-800 px-2 rounded-md"
                                onClick={() => handleDelete(job.id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="flex p-4">
                    <button
                        className="bg-yellow-200 text-gray-800 dark:text-gray-200 dark:bg-gray-800 hover:bg-blue-500 dark:shadow-none shadow-black/70 shadow-lg hover:dark:bg-blue-700 p-2 mr-3 rounded-full"
                        onClick={prevPage}
                        disabled={currentPage === 1}
                    >
                        <FaArrowLeft />
                    </button>
                    <button
                        className="bg-yellow-200 text-gray-800 dark:text-gray-200 dark:bg-gray-800 hover:bg-blue-500 dark:shadow-none shadow-black/70 shadow-lg hover:dark:bg-blue-700 p-2 rounded-full"
                        onClick={nextPage}
                        disabled={
                            currentPage === Math.ceil(jobs.length / jobsPerPage)
                        }
                    >
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddJob
