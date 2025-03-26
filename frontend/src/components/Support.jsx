import React from 'react'
import {useState} from 'react'
import {FiAlertTriangle} from 'react-icons/fi'
import {FiPhoneCall} from 'react-icons/fi'
import {HiOutlineMail} from 'react-icons/hi'

const Support = () => {
    const [openIndex, setOpenIndex] = useState(null)

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index)
    }
    return (
        <div className="min-h-screen bg-[var(--bg1)] dark:bg-gray-100 p-3 sm:p-8 poppins">
            <div className=" mx-auto bg-[var(--opac)] dark:bg-white border-[1px] border-[var(--opac)] dark:border-gray-300 shadow-md rounded-lg p-3 sm:p-6">
                <h1 className="text-3xl font-bold text-[var(--lgold)] dark:text-[#2f9b9d]">
                    LSPD Support Page
                </h1>
                <p className="mb-6 text-gray-400 text-center">
                    Welcome to the LSPD Support Page! Here at the Los Santos
                    Police Department, we are committed to ensuring the safety
                    and well-being of all residents and visitors in our city.
                    Whether you need assistance with a minor inquiry or have a
                    major concern, we are here to help.
                </p>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-200 dark:text-[#2f9b9d] mb-2">
                        Contact Us
                    </h2>

                    <div className="poppins flex md:flex-row flex-col md:gap-6 gap-3 ">
                        <div className="flex flex-col md:gap-5 gap-3 md:w-1/2 w-full animate-appear blockanim">
                            <div className="p-4 bg-[var(--opac)] dark:bg-white border-[1px] border-[var(--opac)] shadow-black/30 shadow-lg dark:shadow-none dark:border-gray-200 rounded-lg flex items-start">
                                <div className="text-left align-left text-xl p-3 mt-3 text-gray-200 dark:text-[#2f9b9d] border-[1px] border-gray-200 dark:border-[#2f9b9d] flex justify-center items-center rounded-full">
                                    <FiAlertTriangle />
                                </div>
                                <div className="ml-4">
                                    <h2 className="text-xs md:text-lg mt-2 font-bold text-[var(--lgold)] dark:text-[#2f9b9d]">
                                        Emergency Hotline
                                    </h2>
                                    <hr className="h-px my-2 bg-[var(--opac2)] border-0 dark:bg-gray-200 w-full"></hr>
                                    <p className=" text-lg md:text-xl  text-[var(--ltext)] dark:text-gray-500">
                                        Dial 911
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:gap-5 gap-3 md:w-1/2 w-full animate-appear blockanim">
                            <div className="p-4 bg-[var(--opac)] dark:bg-white border-[1px] border-[var(--opac)] shadow-black/30 shadow-lg dark:shadow-none dark:border-gray-200 rounded-lg flex items-start">
                                <div className="text-left align-left text-xl p-3 mt-3 text-gray-200 dark:text-[#2f9b9d] border-[1px] border-gray-200 dark:border-[#2f9b9d] flex justify-center items-center rounded-full">
                                    <FiPhoneCall />
                                </div>
                                <div className="ml-4">
                                    <h2 className="text-xs md:text-lg mt-2 font-bold text-[var(--lgold)] dark:text-[#2f9b9d]">
                                        Non-Emergency Line
                                    </h2>
                                    <hr className="h-px my-2 bg-[var(--opac2)] border-0 dark:bg-gray-200 w-full"></hr>
                                    <p className="text-lg md:text-xl text-[var(--ltext)] dark:text-gray-500">
                                        (555) 123-4567
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:gap-5 gap-3 md:w-1/2 w-full animate-appear blockanim">
                            <div className="p-4 bg-[var(--opac)] dark:bg-white border-[1px] border-[var(--opac)] shadow-black/30 shadow-lg dark:shadow-none dark:border-gray-200 rounded-lg flex items-start">
                                <div className="text-left align-left text-xl p-3 mt-3 text-gray-200 dark:text-[#2f9b9d] border-[1px] border-gray-200 dark:border-[#2f9b9d] flex justify-center items-center rounded-full">
                                    <HiOutlineMail />
                                </div>{' '}
                                <div className="ml-4">
                                    <h2 className="text-xs md:text-lg mt-2 font-bold text-[var(--lgold)] dark:text-[#2f9b9d]">
                                        Email
                                    </h2>
                                    <hr className="h-px my-2 bg-[var(--opac2)] border-0 dark:bg-gray-200 w-full"></hr>
                                    <p className="text-lg md:text-xl text-[var(--ltext)] dark:text-gray-500">
                                        support@lspd-losantos.gov
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-200 dark:text-[#2f9b9d] mb-2">
                        Frequently Asked Questions
                    </h2>
                    <div className="p-4 bg-[var(--opac)] space-y-2 dark:bg-white border-[1px] border-[var(--opac)] shadow-black/30 shadow-lg dark:shadow-none dark:border-gray-200 rounded-lg">
                        {[
                            {
                                question: 'How can I file a police report?',
                                answer: 'You can file a police report by visiting your nearest LSPD station or by calling our non-emergency line. For certain types of reports, you may also use our online reporting system.',
                            },
                            {
                                question:
                                    'What should I do if I witness a crime?',
                                answer: 'If you witness a crime in progress, dial 911 immediately. If it is safe to do so, provide as much detail as possible to the dispatcher. For non-urgent matters, please use our non-emergency line.',
                            },
                            {
                                question:
                                    'How can I check the status of my case?',
                                answer: 'To check the status of your case, contact the detective assigned to your case directly. You can find their contact information on the report you received. Alternatively, you can call our main office and ask to be connected to the relevant department.',
                            },
                        ].map((item, index) => (
                            <div key={index}>
                                <h3
                                    className="text-lg font-medium text-gray-400 cursor-pointer"
                                    onClick={() => toggleAccordion(index)}
                                >
                                    {item.question}
                                </h3>
                                {openIndex === index && (
                                    <p className="mt-2 text-[var(--lgold)]">
                                        {item.answer}
                                    </p>
                                )}
                                <hr className="h-px my-2 bg-[var(--opac2)] border-0 dark:bg-gray-200 w-full"></hr>
                            </div>
                        ))}
                    </div>
                </section>
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-200 dark:text-[#2f9b9d] mb-2">
                        Online Services
                    </h2>
                    {/* <div className="p-4 bg-[var(--opac)] space-y-2 dark:bg-white border-[1px] border-[var(--opac)] shadow-black/30 shadow-lg dark:shadow-none dark:border-gray-200 text-gray-400 rounded-lg">
                        <p>
                            <strong>File a Report Online:</strong> Submit a
                            report for non-urgent incidents, such as lost
                            property, theft, or vandalism.
                        </p>
                        <p>
                            <strong>Request Records:</strong> Obtain copies of
                            police reports, accident reports, and other public
                            records.
                        </p>
                        <p>
                            <strong>Crime Mapping:</strong> View interactive
                            maps displaying recent crime activity in your area.
                        </p>
                        <p>
                            <strong>Community Programs:</strong> Learn about our
                            various community outreach programs, including
                            neighborhood watch, youth initiatives, and more.
                        </p>
                    </div> */}
                    <div className="md:flex grid grid-cols-1 md:gap-5 gap-3 w-full animate-appear blockanim">
                        <div className="p-4 bg-[var(--opac)] dark:bg-white border-[1px] border-[var(--opac)] shadow-black/30 shadow-lg dark:shadow-none dark:border-gray-200 rounded-lg flex items-start">
                            <div>
                                <h2 className="text-lg md:text-xl mt-2 font-bold text-[var(--lgold)] dark:text-[#2f9b9d]">
                                    File a Report Online
                                </h2>
                                <hr className="h-px my-2 bg-[var(--opac2)] border-0 dark:bg-gray-200 w-full"></hr>
                                <p className="  text-xs md:text-lg text-[var(--ltext)] dark:text-gray-500">
                                    Submit a report for non-urgent incidents,
                                    such as lost property, theft, or vandalism.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 bg-[var(--opac)] dark:bg-white border-[1px] border-[var(--opac)] shadow-black/30 shadow-lg dark:shadow-none dark:border-gray-200 rounded-lg flex items-start">
                            <div>
                                <h2 className="text-lg md:text-xl mt-2 font-bold text-[var(--lgold)] dark:text-[#2f9b9d]">
                                    Submit a tip
                                </h2>
                                <hr className="h-px my-2 bg-[var(--opac2)] border-0 dark:bg-gray-200 w-full"></hr>
                                <p className="  text-xs md:text-lg text-[var(--ltext)] dark:text-gray-500">
                                    You can send us a tip anonymously, if you
                                    find out something fishy!
                                </p>
                            </div>
                        </div>
                        <div className="p-4 bg-[var(--opac)] dark:bg-white border-[1px] border-[var(--opac)] shadow-black/30 shadow-lg dark:shadow-none dark:border-gray-200 rounded-lg flex items-start">
                            <div>
                                <h2 className="text-lg md:text-xl mt-2 font-bold text-[var(--lgold)] dark:text-[#2f9b9d]">
                                    Wanted Criminals List
                                </h2>
                                <hr className="h-px my-2 bg-[var(--opac2)] border-0 dark:bg-gray-200 w-full"></hr>
                                <p className="  text-xs md:text-lg text-[var(--ltext)] dark:text-gray-500">
                                    View details of potential threats of Los
                                    Santos and stay aware.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <p className="text-center text-gray-300 dark:text-gray-400 mt-8">
                    Thank you for visiting the LSPD Support Page. We are
                    dedicated to serving and protecting the community of Los
                    Santos. Stay safe!
                </p>
                <hr className="h-px my-2 bg-[var(--opac2)] border-0 dark:bg-gray-200 w-full"></hr>

                <p className="text-center text-[var(--lgold)] mt-2">
                    <strong>Los Santos Police Department</strong>
                    <br />
                    Protecting and Serving Since 2024
                </p>
            </div>
        </div>
    )
}

export default Support
