import React from 'react'
import {Link} from 'react-router-dom'
import * as AiIcons from 'react-icons/ai'

const tips = [
    {
        title: 'Why Submit a Tip?',
        content:
            'Your information can help us solve crimes faster and keep the community safe.',
        icon: <AiIcons.AiOutlineQuestion />,
    },
    {
        title: 'How It Works',
        content:
            'Submit your tip anonymously or provide contact details for a follow-up.',
        icon: <AiIcons.AiOutlineSignature />,
    },
    {
        title: 'Rewards',
        content:
            'Eligible tips may earn you rewards as a thank you for your help.',
        icon: <AiIcons.AiOutlineSketch />,
    },
]

const HomeSubmitTip = () => {
    return (
        <div className="bg-[var(--bg1)] border-t-4 border-[var(--lgold)] dark:bg-white dark:border-[var(--dltext)] p-4 md:p-10">
            <div className="p-6 mb-6 text-center animate-appear blockanim">
                <h2 className="text-2xl md:text-4xl pricedown mb-2 text-[var(--lgold)] dark:text-[var(--dlgold)]">
                    Submit a Tip
                </h2>
                <p className="text-md md:text-xl poppins mb-4 text-[var(--ltext)] dark:text-[var(--dltext)]">
                    Have something to share? Help us keep the streets of Los
                    Santos safe.
                </p>
            </div>

            <div className="poppins bg-[var(--opac)] animate-appear blockanim grid md:grid-cols-3 grid-cols md:gap-5 gap-3 dark:bg-gray-100 border-[1px] border-[var(--opac)] dark:border-gray-200 dark:shadow-none shadow-black/60 shadow-2xl rounded-xl md:p-5 p-3">
                {tips.map((tip, index) => (
                    <div
                        key={index}
                        className="p-4 bg-[var(--opac)] dark:bg-white border-[1px] border-[var(--opac)] shadow-black/30 shadow-lg dark:shadow-none dark:border-gray-200 rounded-lg flex flex-col items-center"
                    >
                        <div className="text-left align-left md:text-[80px] text-[50px] p-6 mb-4 text-gray-200 dark:text-[var(--dltext)] border-[1px] border:gray-200 dark:border-[var(--dltext)] flex justify-center items-center rounded-full">
                            {tip.icon}
                        </div>
                        <h2 className="text-lg md:text-xl mt-2 font-bold text-[var(--lgold)] dark:text-[var(--dltext)]">
                            {tip.title}
                        </h2>
                        <hr className="h-px my-2 bg-[var(--opac2)] border-0 dark:bg-gray-200 w-full"></hr>
                        <p className="text-xs md:text-sm px-4 text-[var(--ltext)] dark:text-gray-500 text-center">
                            {tip.content}
                        </p>
                    </div>
                ))}
            </div>

            <div className="md:col-span-2 pt-10 pb-6 md:pb-0 flex justify-center poppins animate-appear blockanim">
                <Link to="/submit-tip" className="submit-tip-button">
                    <button
                        type="submit"
                        className="p-2 px-5 border-[1px] border-[var(--opac)] h-[40px] rounded-md bg-[var(--bg4op)] dark:bg-[var(--bg1l)] backdrop-blur-md shadow-black/30 hover:shadow-black/40 hover:bg-[var(--opac)] hover:dark:bg-[var(--bg1)] shadow-md hover:shadow-xl text-gray-200 flex items-center justify-center"
                    >
                        Submit Tip <AiIcons.AiOutlineEdit className="ml-2" />
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default HomeSubmitTip
