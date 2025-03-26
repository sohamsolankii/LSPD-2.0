import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import conf from '../../assets/conf.jpg'

const Press = () => {
    const [RoomCode, setRoomCode] = useState('')
    const navigate = useNavigate()

    const submitCode = async (e) => {
        e.preventDefault()

        try {
            // Make the POST request to the backend
            const response = await axios.post('/api/v1/press/add', {
                code: RoomCode,
            })
            console.log(response.data) // Handle the response if needed

            // Navigate to the desired route
            navigate(`/room/${RoomCode}`)
        } catch (error) {
            console.error('Error submitting code:', error)
            // Handle the error, show a notification or alert
        }
    }

    return (
        <div className="h-full min-h-screen bg-[var(--bg1)] dark:bg-gray-200 p-6">
            {/* <div className="relative h-screen">
                <div className="lg:flex lg:pt-20 flex-col items-center justify-center relative z-10 px-6 md:max-w-[90vw] mx-auto">
                    <div className="flex flex-col items-center justify-center pb-8">
                        <h1 className="text-[50px] md:text-[80px] text-white font-bold pt-12">
                            Live News Chat
                        </h1>
                        <p className="text-[26px] text-white -mt-2">
                            With LSPD
                        </p>
                    </div>

                    <form
                        onSubmit={submitCode}
                        className="text-white md:pt-12 flex flex-col items-center justify-center"
                    >
                        <div className="flex flex-col justify-center items-center">
                            <label className="text-[30px] md:text-[40px] font-bold pt-6">
                                Enter Room Code
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="Enter Room Code"
                                value={RoomCode}
                                onChange={(e) => setRoomCode(e.target.value)}
                                className="py-1.5 md:py-2 px-4 rounded-full max-w-[14rem] mt-2 text-black md:mt-6 outline-0"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-400 duration-100 ease-out font-bold w-[5rem] md:w-[7rem] rounded-full py-[5px] md:py-[7px] mt-2 md:mt-4"
                        >
                            Go
                        </button>
                    </form>
                </div>
            </div> */}

            <div className="flex flex-col md:flex-row justify-between bg-[var(--opac)] dark:bg-white border-[var(--opac2)] dark:border-gray-400 border-[1px] shadow-2xl shadow-black/70 dark:shadow-none rounded-xl ">
                <div className="flex w-full md:w-1/2 flex-col justify-center  p-6 items-center mb-4 md:mb-0">
                    <div className="w-full text-center  ">
                        <label className="text-2xl pricedown text-[var(--lgold)] dark:text-[var(--dltext)] md:mb-6 mb-3 md:text-[40px] font-bold md:pt-6 pt-2 block">
                            Join Live Video Press
                        </label>
                        <p className="text-xs my-3 poppins text-gray-300 dark:text-gray-500 text-justify px-0 md:px-10">
                            Welcome to the LSPD Press Conference! We're thrilled
                            to have you join us for this important event. Before
                            we begin, we kindly remind all participants to
                            maintain respectful and professional behavior
                            throughout the meeting. Any disruptive actions or
                            inappropriate comments will not be tolerated and may
                            result in removal from the conference. To join the
                            live video press meeting, please enter the unique
                            room code provided to you. This code ensures secure
                            access and helps us manage attendance effectively.
                            We appreciate your cooperation and look forward to
                            an engaging and productive session. Thank you for
                            your participation and support of the Los Santos
                            Police Department.
                        </p>
                        <div>
                            {' '}
                            <form
                                onSubmit={submitCode}
                                className="flex md:px-10 px-0 mt-7 poppins"
                            >
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter Room Code"
                                    value={RoomCode}
                                    onChange={(e) =>
                                        setRoomCode(e.target.value)
                                    }
                                    className="w-full pl-3 rounded-l-lg dark:bg-gray-300 dark:text-gray-800 text-black p-2"
                                />
                                <button
                                    type="submit"
                                    className="bg-[var(--lgold)] dark:bg-[var(--dltext)] dark:text-white rounded-r-lg hover:bg-[var(--lblue)] hover:dark:bg-gray-500 border-l-4 border-[var(--bg1)] dark:border-white duration-100 p-2 px-6 ease-out font-bold"
                                >
                                    Join
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="h-auto w-full md:w-1/2 grid grid-cols-2 md:gap-6 md:p-6 gap-3 p-3">
                    <img
                        src="/src/assets/1.jpeg"
                        alt="Image 1"
                        className="cursor-pointer border-[1px] border-[var(--opac2)] shadow-black/30 shadow-xl dark:shadow-none dark:border-gray-400 rounded-lg"
                    />
                    <img
                        src="/src/assets/2.jpeg"
                        alt="Image 2"
                        className="cursor-pointer border-[1px] border-[var(--opac2)] shadow-black/30 shadow-xl dark:shadow-none dark:border-gray-400 rounded-lg"
                    />
                    <img
                        src="/src/assets/4.jpeg"
                        alt="Image 3"
                        className="cursor-pointer w-full col-span-2 border-[1px] border-[var(--opac2)] shadow-black/30 shadow-xl dark:shadow-none dark:border-gray-400 rounded-lg"
                    />
                </div>
            </div>
        </div>
    )
}

export default Press
