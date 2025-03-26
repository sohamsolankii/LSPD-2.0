import axios from 'axios'
import React, {useState, useEffect} from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import {FaLocationDot} from 'react-icons/fa6'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

const Careers = () => {
    const [jobs, setJobs] = useState([])
    const [filteredJobs, setFilteredJobs] = useState([])
    const navigate = useNavigate()
    const [selectedJob, setSelectedJob] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [modalContent, setModalContent] = useState('')
    const [modalTitle, setModalTitle] = useState('')

    const [titleFilter, setTitleFilter] = useState('')
    const [locationFilter, setLocationFilter] = useState('')
    const [salaryFilter, setSalaryFilter] = useState('')
    const [jobTypeFilter, setJobTypeFilter] = useState('')

    useEffect(() => {
        fetchCareers()
    }, [])

    useEffect(() => {
        applyFilters()
    }, [titleFilter, locationFilter, salaryFilter, jobTypeFilter, jobs])

    const applyFilters = () => {
        let filtered = jobs
        if (titleFilter) {
            filtered = filtered.filter((job) =>
                job.title.toLowerCase().includes(titleFilter.toLowerCase()),
            )
        }
        if (locationFilter) {
            filtered = filtered.filter((job) =>
                job.location
                    .toLowerCase()
                    .includes(locationFilter.toLowerCase()),
            )
        }
        if (salaryFilter) {
            filtered = filtered.filter((job) =>
                job.salaryRange.includes(salaryFilter),
            )
        }
        if (jobTypeFilter) {
            filtered = filtered.filter((job) =>
                job.jobType.toLowerCase().includes(jobTypeFilter.toLowerCase()),
            )
        }
        setFilteredJobs(filtered)
    }

    const handleReadMore = (content, title) => {
        setModalContent(content)
        setModalTitle(title)
        setShowModal(true)
    }

    const truncateText = (text, length = 20) => {
        return text.length > length ? `${text.substring(0, length)}...` : text
    }

    const applyJob = async (id) => {
        try {
            await axios.get(`/api/v1/application/${id}`)
            toast.success('Application submitted successfully!')
        } catch (err) {
            if (err.response && err.response.status === 404) {
                toast.error('This job has already been applied')
            } else {
                toast.error('You must login first!')
                navigate('/login')
            }
            console.log(err)
        }
    }

    const fetchCareers = async () => {
        try {
            const response = await axios.get('/api/v1/job', {
                withCredentials: true,
            })
            setJobs(response.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="p-4 md:p-6 min-h-screen poppins bg-cover dark:bg-gray-100 bg-[var(--bg2)]">
            <div className="mb-6 rounded-2xl shadow-black/70 dark:shadow-black/10 bg-[var(--bg1)] dark:bg-gray-100 dark:border-gray-400 border-[1px] border-[var(--opac)]">
                <h2 className="text-3xl rounded-xl font-medium m-2 p-2 text-[var(--lgold)] dark:text-[var(--dltext)] text-center dark:shadow-black/10 shadow-black/70 bg-[var(--bg1)] dark:bg-gray-100 dark:border-gray-400">
                    Careers
                </h2>

                <div className="p-5">
                    <div className="inline-flex items-center mb-[50px] justify-center w-full">
                        <hr className="w-[90%] h-px my-8 bg-[var(--lgold)] border-0 dark:bg-[var(--dltext)]"></hr>
                        <span className="absolute px-3 text-lg text-[var(--lgold)] -translate-x-1/2 bg-[var(--bg1)] left-1/2 dark:text-[var(--dltext)] dark:bg-gray-100">
                            Explore Careers
                        </span>
                    </div>

                    <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        <input
                            type="text"
                            placeholder="Filter by title"
                            value={titleFilter}
                            onChange={(e) => setTitleFilter(e.target.value)}
                            className="p-2 rounded-md border-gray-300 bg-[var(--opac)] text-white hover:dark:bg-blue-100"
                        />
                        <input
                            type="text"
                            placeholder="Filter by location"
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                            className="p-2 rounded-md border-gray-300 bg-[var(--opac)] text-white hover:dark:bg-blue-100"
                        />
                        <input
                            type="text"
                            placeholder="Filter by salary"
                            value={salaryFilter}
                            onChange={(e) => setSalaryFilter(e.target.value)}
                            className="p-2 rounded-md border-gray-300 bg-[var(--opac)] text-white hover:dark:bg-blue-100"
                        />
                        <input
                            type="text"
                            placeholder="Filter by job type"
                            value={jobTypeFilter}
                            onChange={(e) => setJobTypeFilter(e.target.value)}
                            className="p-2 rounded-md border-gray-100 bg-[var(--opac)] text-white hover:dark:bg-blue-100"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredJobs.map((job) => (
                            <div
                                key={job._id}
                                className="p-6 bg-[var(--opac)] dark:bg-gray-100 border-[1px] border-[var(--opac)] dark:border-gray-300 rounded-lg shadow-black/50 shadow-lg dark:shadow-none hover:bg-[var(--opac2)] hover:dark:bg-blue-100"
                            >
                                <div className="flex flex-col h-full justify-between">
                                    <div className="flex flex-col gap-1 mb-4">
                                        <div className="flex items-center mb-2">
                                            <h3 className="text-xl font-semibold text-[var(--lgold)] dark:text-[var(--dltext)]">
                                                {job.title}
                                            </h3>
                                        </div>
                                        <hr className="h-px mb-2 bg-[var(--opac2)] border-0 dark:bg-gray-300"></hr>
                                        <div className="flex items-center gap-2 text-md text-gray-200 dark:text-gray-600">
                                            <AiIcons.AiOutlineUser />
                                            <span>
                                                {job.department || 'LSPD'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-md text-gray-200 dark:text-gray-600">
                                            <FaLocationDot />
                                            <span>{job.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-md text-gray-200 dark:text-gray-600">
                                            <AiIcons.AiOutlineBars />
                                            <span>{job.jobType}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-md text-gray-200 dark:text-gray-600">
                                            <FaIcons.FaDollarSign />
                                            <span>{job.salaryRange}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedJob(job)}
                                        className="md:w-1/3 w-1/4 align-right text-xs p-1 font-medium transition-colors hover:text-gray-400 border-[1px] hover:border-gray-400 border-blue-500 text-blue-500 rounded-md"
                                    >
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {selectedJob && (
                <div className="fixed inset-0 text-gray-300 dark:text-gray-600 flex items-center justify-center z-10">
                    <div className="bg-[var(--opac)] backdrop-blur-3xl border-[1px] border-[var(--opac)] animate-appear blockanim dark:border-gray-400 md:p-6 p-3 rounded-xl lg:w-[85%] shadow-black/80 dark:shadow-black/40 shadow-2xl w-[94%]">
                        <h2 className="text-xl font-medium mb-2 text-center">
                            Job Details
                        </h2>
                        <div className="flex items-center grid gap-4 md:grid-cols-3 grid-cols-1 justify-center rounded-lg p-4">
                            {[
                                {
                                    icon: <FaIcons.FaUserTie />,
                                    label: 'Title',
                                    value: selectedJob.title,
                                },
                                {
                                    icon: <FaIcons.FaUserTag />,
                                    label: 'Department',
                                    value: selectedJob.department || 'LSPD',
                                },
                                {
                                    icon: <FaIcons.FaMapMarkerAlt />,
                                    label: 'Location',
                                    value: selectedJob.location,
                                },
                                {
                                    icon: <AiIcons.AiOutlineBars />,
                                    label: 'Job Type',
                                    value: selectedJob.jobType,
                                },
                                {
                                    icon: <FaIcons.FaDollarSign />,
                                    label: 'Salary',
                                    value: selectedJob.salaryRange,
                                },
                                {
                                    icon: <AiIcons.AiOutlineCheckCircle />,
                                    label: 'Responsibilities',
                                    value: truncateText(
                                        selectedJob.responsibilities,
                                    ),
                                    fullValue: selectedJob.responsibilities,
                                    type: 'Responsibilities',
                                },
                                {
                                    icon: <IoIcons.IoIosPaper />,
                                    label: 'Description',
                                    value: truncateText(
                                        selectedJob.description,
                                    ),
                                    fullValue: selectedJob.description,
                                    type: 'Description',
                                },
                                {
                                    icon: <IoIcons.IoIosListBox />,
                                    label: 'Requirements',
                                    value: truncateText(
                                        selectedJob.requirements,
                                    ),
                                    fullValue: selectedJob.requirements,
                                    type: 'Requirements',
                                },
                                {
                                    icon: <AiIcons.AiOutlineMail />,
                                    label: 'Contact Email',
                                    value: selectedJob.contactEmail,
                                },
                                {
                                    icon: <FaIcons.FaCalendarAlt />,
                                    label: 'Posted Date',
                                    value: new Date(
                                        selectedJob.postedDate,
                                    ).toLocaleDateString(),
                                },
                                {
                                    icon: <FaIcons.FaClock />,
                                    label: 'Application Deadline',
                                    value: new Date(
                                        selectedJob.applicationDeadline,
                                    ).toLocaleDateString(),
                                },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center space-x-4"
                                >
                                    <div className="w-10 h-10 border-[1px] dark:border-gray-400 flex justify-center items-center rounded-full">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="font-light text-xs">
                                            {item.label}
                                        </p>
                                        <p className="md:text-lg text-md">
                                            {item.value}
                                            {item.fullValue &&
                                                item.fullValue.length > 15 && (
                                                    <button
                                                        onClick={() =>
                                                            handleReadMore(
                                                                item.fullValue,
                                                                item.type,
                                                            )
                                                        }
                                                        className="text-blue-500 hover:underline"
                                                    >
                                                        Read More
                                                    </button>
                                                )}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center items-center space-x-6">
                            <button
                                onClick={() => applyJob(selectedJob._id)}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Apply Now
                            </button>
                            <button
                                onClick={() => setSelectedJob(null)}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full">
                        <h2 className="text-2xl mb-4">{modalTitle}</h2>
                        <p className="text-gray-800 dark:text-gray-200">
                            {modalContent}
                        </p>
                        <button
                            onClick={() => setShowModal(false)}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Careers
