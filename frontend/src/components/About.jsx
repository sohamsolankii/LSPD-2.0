import React from 'react'
import {FaLinkedin, FaGithub, FaEnvelope} from 'react-icons/fa'
import {FaLinkedinIn} from 'react-icons/fa6'
import {FiGithub} from 'react-icons/fi'
import {HiOutlineMail} from 'react-icons/hi'
import dp from '../assets/dp.png'
import dp1 from '../assets/dp1.png'

const About = () => {
    const profiles = [
        {
            name: 'Meet Suthar',
            designation: 'Frontend Developer',
            skills: ['React', 'JavaScript', 'HTML', 'CSS'],
            photo: dp1,
            linkedin: 'https://www.linkedin.com/in/meet-suthar-03126a257/',
            github: 'https://github.com/meetsuthar27',
            email: 'meetsuthar2005@gmail.com',
        },
        {
            name: 'Soham Solanki',
            designation: 'Fullstack Developer',
            skills: ['React', 'Node.js', 'Express', 'MongoDB'],
            photo: dp,
            linkedin: 'https://www.linkedin.com/in/sohamsolankii/',
            github: 'https://github.com/SohamSolankii',
            email: 'sohammsolanki@gmail.com',
        },
    ]

    return (
        <div className="min-h-screen poppins bg-[var(--bg1)] dark:bg-gray-100 p-6">
            <div className="mx-auto">
                <h1 className="pricedown md:text-4xl text-3xl font-bold mb-8 text-[var(--lblue)] dark:text-[var(--dlblue)]">
                    About Us
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-3 mb-8">
                    {profiles.map((profile, index) => (
                        <div
                            key={index}
                            className="bg-[var(--opac)] border-[1px] border-[var(--opac)] dark:border-gray-300 dark:bg-white shadow-xl shadow-black/70 dark:shadow-none rounded-2xl p-3 md:p-6"
                        >
                            <img
                                src={profile.photo}
                                alt={`${profile.name}`}
                                className="w-full rounded-xl mx-auto border-[1px] border-[var(--opac2)] mb-4"
                            />
                            <h2 className="text-3xl pricedown text-[var(--lgold)] dark:text-[var(--dltext)] font-semibold text-center mb-2">
                                {profile.name}
                            </h2>
                            <h3 className="text-lg text-gray-300 dark:text-gray-500 text-center mb-4">
                                {profile.designation}
                            </h3>
                            <div className="mb-4 flex justify-center">
                                {profile.skills.map((skill, skillIndex) => (
                                    <code
                                        key={skillIndex}
                                        className="mr-2 text-xs p-1 px-3 rounded-full bg-[var(--opac2)] dark:bg-gray-200"
                                    >
                                        {skill}
                                    </code>
                                ))}
                            </div>
                            <hr className="h-px my-2 bg-[var(--opac2)] border-0 dark:bg-gray-300 w-full"></hr>

                            <div className="flex justify-center space-x-4 mt-4">
                                <a
                                    href={profile.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[var(--opac2)] p-2 rounded-full border-[1px] dark:text-gray-300 dark:border-gray-300 hover:text-[var(--lgold)] hover:border-[var(--lgold)] border-[var(--opac2)]"
                                >
                                    <FaLinkedinIn size={24} />
                                </a>
                                <a
                                    href={profile.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[var(--opac2)] p-2 rounded-full border-[1px] dark:text-gray-300 dark:border-gray-300 hover:text-[var(--lgold)] hover:border-[var(--lgold)] border-[var(--opac2)]"
                                >
                                    <FiGithub size={24} />
                                </a>
                                <a
                                    href={`mailto:${profile.email}`}
                                    className="text-[var(--opac2)] p-2 rounded-full border-[1px] dark:text-gray-300 dark:border-gray-300 hover:text-[var(--lgold)] hover:border-[var(--lgold)] border-[var(--opac2)]"
                                >
                                    <HiOutlineMail size={24} />
                                </a>
                            </div>
                        </div>
                    ))}
                    <div className="bg-[var(--opac)] border-[1px] border-[var(--opac)] dark:border-gray-300 dark:bg-white shadow-xl shadow-black/70 dark:shadow-none rounded-2xl p-6">
                        <h2 className="text-3xl pricedown text-[var(--lgold)] dark:text-[var(--dltext)] font-semibold text-center mb-2">
                            Enter Queries
                        </h2>
                        <form>
                            <div className="mb-4">
                                <label
                                    htmlFor="name"
                                    className="block text-gray-700"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-4 py-2 border bg-[var(--opac)] dark:bg-gray-100 dark:border-gray-300 border-[1px] border-[var(--opac)] rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="email"
                                    className="block text-gray-700"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-2 border bg-[var(--opac)] dark:bg-gray-100 dark:border-gray-300 border-[1px] border-[var(--opac)] rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="message"
                                    className="block text-gray-700"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    className="w-full px-4 py-2 border bg-[var(--opac)] dark:bg-gray-100 dark:border-gray-300 border-[1px] border-[var(--opac)] rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-[var(--lgold)] dark:bg-[var(--dltext)] dark:text-white text-[var(--bg1l)] dark:hover:bg-[var(--lblue)] rounded-md hover:bg-blue-900"
                            >
                                Email Now
                            </button>
                        </form>
                    </div>
                </div>

                {/* <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">
                        Enter Queries
                    </h2>
                    <form>
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-gray-700"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="message"
                                className="block text-gray-700"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Email Now
                        </button>
                    </form>
                </div> */}
            </div>
        </div>
    )
}

export default About
