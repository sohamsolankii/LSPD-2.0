import React from 'react'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import '../i18n'
import * as AiIcons from 'react-icons/ai'
import {useTranslation} from 'react-i18next'

const careers = [
    {
        title: 'Join Our Team',
        content:
            'Become a part of the LSPD and make a difference in the community to bring a change.',
        icon: <AiIcons.AiOutlineTeam />,
    },
    {
        title: 'Career Growth',
        content:
            'We offer numerous opportunities for growth and advancement, allowing you to achieve your professional goals.',
        icon: <AiIcons.AiOutlineRise />,
    },
    {
        title: 'Benefits',
        content:
            'Enjoy a comprehensive benefits package, including healthcare and retirement plans.',
        icon: <AiIcons.AiOutlineHeart />,
    },
]

const languages = [
    {value: 'en', text: 'English'},
    {value: 'hi', text: 'Hindi'},
    {value: 'bn', text: 'Bengali'},
]

const HomeCareers = () => {
    return (
        <div className="bg-[var(--bg1)] border-t-4 border-[var(--lgold)] dark:bg-white dark:border-[#2f9b9d] p-4 md:p-10">
            <div className="p-6 mb-6 text-center animate-appear blockanim">
                <h2 className="text-2xl md:text-4xl pricedown mb-2 text-[var(--lgold)] dark:text-[#2f9b9d]">
                    Careers at LSPD
                </h2>
                <p className="text-md md:text-xl poppins mb-4 text-[var(--ltext)] dark:text-[#66bea7]">
                    Explore a fulfilling career with the Los Santos Police
                    Department.
                </p>
            </div>

            <div className="poppins bg-[var(--opac)] animate-appear blockanim flex md:flex-row flex-col md:gap-6 gap-3 dark:bg-gray-100 border-[1px] border-[var(--opac)] dark:border-gray-200 dark:shadow-none shadow-black/60 shadow-2xl rounded-xl md:p-6 p-3">
                <div className="flex flex-col md:gap-5 gap-3 md:w-1/2 w-full animate-appear blockanim">
                    {careers.map((career, index) => (
                        <div
                            key={index}
                            className="p-4 bg-[var(--opac)] dark:bg-white border-[1px] border-[var(--opac)] shadow-black/30 shadow-lg dark:shadow-none dark:border-gray-200 rounded-lg flex items-start"
                        >
                            <div className="text-left align-left text-[40px] md:text-[50px] p-6 mb-4 text-gray-200 dark:text-[#2f9b9d] border-[1px] border-gray-200 dark:border-[#2f9b9d] flex justify-center items-center rounded-full">
                                {career.icon}
                            </div>
                            <div className="ml-4">
                                <h2 className="text-lg md:text-xl mt-2 font-bold text-[var(--lgold)] dark:text-[#2f9b9d]">
                                    {career.title}
                                </h2>
                                <hr className="h-px my-2 bg-[var(--opac2)] border-0 dark:bg-gray-200 w-full"></hr>
                                <p className="text-xs md:text-lg text-[var(--ltext)] dark:text-gray-500">
                                    {career.content}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-center md:w-1/2 w-full">
                    <img
                        src="/src/assets/careers.webp"
                        alt="Careers at LSPD"
                        className="rounded-lg shadow-lg"
                    />
                </div>
            </div>

            <div className="md:col-span-2 pt-10 pb-6 md:pb-0 flex justify-center poppins">
                <Link to="/career" className="careers-button">
                    <button
                        type="button"
                        className="p-2 px-5 border-[1px] border-[var(--opac)] h-[40px] rounded-md bg-[var(--bg4op)] dark:bg-[#2f9b9d] backdrop-blur-md shadow-black/30 hover:shadow-black/40 hover:bg-[var(--opac)] hover:dark:bg-[var(--bg1)] shadow-md hover:shadow-xl text-gray-200 dark:text-[#f5e7a1] flex items-center justify-center"
                    >
                        Explore Careers{' '}
                        <AiIcons.AiOutlineRight className="ml-2" />
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default HomeCareers
