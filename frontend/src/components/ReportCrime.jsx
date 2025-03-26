import axios from 'axios'
import React, {useContext, useState} from 'react'
import {FaPlus} from 'react-icons/fa'
import {toast} from 'react-hot-toast'
import {UserContext} from '../context/userContext'
import {useNavigate} from 'react-router-dom'

const ReportCrime = () => {
	const {user} = useContext(UserContext)
	const navigate = useNavigate()

    const [newComplaint, setNewComplaint] = useState({
        complaint: '',
        location: '',
        description: '',
    })

    const [isEditing, setIsEditing] = useState(false)
   
    const handleChange = (e) => {
        setNewComplaint({
            ...newComplaint,
            [e.target.name]: e.target.value,
        })
    }

    const handleReportCrime = async () => {
		if(user){
			try {
				const res = await axios.post(
					'/api/v1/reportCrime/report-crime',
					newComplaint,
					{
						withCredentials: true,
					},
				)
				console.log(res)
				toast.success('Complaint submitted successfully!')
			} catch (error) {
				console.error(error)
				toast.error('Error submitting complaint.')
			} finally {
				setNewComplaint({
					complaint: '',
					location: '',
					description: '',
				})
			}
		}
		else{
			toast.error('You Have to login first!')
            navigate('/login')
		}
    }

    return (
        <div className="p-4 md:p-6 poppins min-h-screen dark:bg-gray-100 bg-[var(--bg2)]">
            <div className="mb-6 rounded-2xl shadow-black/70 dark:shadow-black/10 bg-[var(--bg1)] dark:bg-gray-100 dark:border-gray-400 border-[1px] border-[var(--opac)] shadow-2xl">
                <h2 className="text-2xl rounded-xl font-medium m-2 p-2 text-[var(--lgold)] dark:text-[var(--dltext)] text-center dark:shadow-black/10 shadow-black/70 dark:bg-gray-100 dark:border-gray-400 bg-[var(--bg1)]">
                    {isEditing ? 'Edit Complaint' : 'Add Complaint'}
                </h2>
                <form
                    className="grid grid-cols-1 gap-5 md:grid-cols-2 p-5"
                    onSubmit={(e) => e.preventDefault()}
                >
                    {/* <div className="flex flex-col">
                        <label className="text-sm text-gray-500 pb-2">
                            Enter User ID
                        </label>
                        <input
                            type="text"
                            name="user"
                            value={newComplaint.user}
                            onChange={handleChange}
                            placeholder="User ID"
                            className="p-2 border-[1px] border-[var(--opac)] dark:border-gray-300 h-[40px] rounded-md bg-[var(--opac)] dark:bg-gray-100 backdrop-blur-md shadow-black/30 dark:shadow-none shadow-md text-gray-200 dark:text-[var(--dltext)]"
                            required
                        />
                    </div> */}
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-500 pb-2">
                            Enter the complaint
                        </label>
                        <input
                            type="text"
                            name="complaint"
                            value={newComplaint.complaint}
                            onChange={handleChange}
                            placeholder="Complaint"
                            className="p-2 border-[1px] border-[var(--opac)] dark:border-gray-300 h-[40px] rounded-md bg-[var(--opac)] dark:bg-gray-100 backdrop-blur-md shadow-black/30 dark:shadow-none shadow-md text-gray-200 dark:text-[var(--dltext)]"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-500 pb-2">
                            Enter the location
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={newComplaint.location}
                            onChange={handleChange}
                            placeholder="Location"
                            className="p-2 border-[1px] border-[var(--opac)] dark:border-gray-300 h-[40px] rounded-md bg-[var(--opac)] dark:bg-gray-100 backdrop-blur-md shadow-black/30 dark:shadow-none shadow-md text-gray-200 dark:text-[var(--dltext)]"
                            required
                        />
                    </div>
                    <div className="flex flex-col md:col-span-2">
                        <label className="text-sm text-gray-500 pb-2">
                            Provide a description
                        </label>
                        <textarea
                            name="description"
                            value={newComplaint.description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="p-2 border-[1px] border-[var(--opac)] dark:border-gray-300 h-[80px] rounded-md bg-[var(--opac)] dark:bg-gray-100 backdrop-blur-md shadow-black/30 dark:shadow-none shadow-md text-gray-200 dark:text-[var(--dltext)]"
                            required
                        />
                    </div>
                    <div className="md:col-span-2 flex justify-center">
                        <button
                            type="submit"
                            className="p-2 px-5 border-[1px] border-[var(--opac)] h-[40px] rounded-md bg-[var(--bg4op)] dark:bg-[var(--bg1l)] backdrop-blur-md shadow-black/30 hover:shadow-black/40 hover:bg-[var(--opac)] hover:dark:bg-[var(--bg1)] shadow-md hover:shadow-xl text-gray-200 flex items-center justify-center"
                            onClick={handleReportCrime}
                        >
                            {isEditing ? 'Update Complaint' : 'Add Complaint'}{' '}
                            <FaPlus className="ml-2" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ReportCrime
