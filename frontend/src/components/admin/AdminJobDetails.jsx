import React, { useState } from 'react';
// import Rating from './components/Pages/career/Rating.jsx'
import CSIImage from '/src/assets/place.png';

const AdminJobDetails = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [jobTitle, setJobTitle] = useState("Crime Scene Investigator");
    const [department, setDepartment] = useState("Forensics Department");
    const [description, setDescription] = useState("As a Crime Scene Investigator (CSI), you will be responsible for collecting, preserving, and analyzing physical evidence from crime scenes. Your work will play a crucial role in solving crimes and bringing justice to victims.");
    const [responsibilities, setResponsibilities] = useState([
        "Collect and preserve physical evidence from crime scenes.",
        "Analyze evidence in the laboratory.",
        "Prepare detailed reports on findings.",
        "Testify in court as an expert witness."
    ]);
    const [requirements, setRequirements] = useState([
        "Bachelor's degree in Forensic Science, Criminal Justice, or a related field.",
        "Experience in crime scene investigation or related field.",
        "Strong analytical and observational skills.",
        "Excellent written and verbal communication skills."
    ]);

    const [showConfirmation, setShowConfirmation] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handlePublish = () => {
        setShowConfirmation(true);
    };

    const confirmPublish = () => {
        // Code to update the normal user's job details
        setShowConfirmation(false);
        alert("Job details published successfully!");
    };

    const cancelPublish = () => {
        setShowConfirmation(false);
    };

    const handleListChange = (index, value, setState) => {
        const newList = [...setState];
        newList[index] = value;
        setState(newList);
    };

    return (
        <div className={`${darkMode ? 'dark' : ''}`}>
            <div className="bg-[var(--bg1)] dark:bg-[var(--dbg1)] min-h-screen text-[var(--lblue)] dark:text-[var(--dlgold)] p-4 md:p-12">
                <div className="flex flex-col md:flex-row items-center md:items-start bg-[var(--bg2)] dark:bg-[var(--dbg2)] rounded-2xl">

                    <div className="text-left w-full md:w-2/3 p-4 md:p-7">
                        <textarea
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            className="text-2xl md:text-4xl poppins font-semibold text-[var(--lgold)] dark:text-[var(--dltext)] bg-transparent border-none focus:outline-none resize-none w-full"
                        />
                        <textarea
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            className="text-lg md:text-2xl poppins bg-transparent border-none focus:outline-none resize-none w-full"
                        />
                        <hr className="h-px my-8 bg-gray-100 border-0 dark:bg-gray-700"></hr>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="text-md md:text-xl poppins mb-4 text-[var(--ltext)] dark:text-[var(--dltext)] bg-transparent border-none focus:outline-none resize-none w-full"
                        />
                        <h3 className="text-xl md:text-2xl poppins mb-2">
                            Responsibilities
                        </h3>
                        <ul className="list-disc list-inside poppins mb-4">
                            {responsibilities.map((responsibility, index) => (
                                <li key={index}>
                                    <textarea
                                        value={responsibility}
                                        onChange={(e) => handleListChange(index, e.target.value, setResponsibilities)}
                                        className="bg-transparent border-none focus:outline-none resize-none w-full"
                                    />
                                </li>
                            ))}
                        </ul>
                        <h3 className="text-xl md:text-2xl poppins mb-2">
                            Requirements
                        </h3>
                        <ul className="list-disc list-inside poppins mb-4">
                            {requirements.map((requirement, index) => (
                                <li key={index}>
                                    <textarea
                                        value={requirement}
                                        onChange={(e) => handleListChange(index, e.target.value, setRequirements)}
                                        className="bg-transparent border-none focus:outline-none resize-none w-full"
                                    />
                                </li>
                            ))}
                        </ul>
                        <div>
                            <h3 className="text-xl md:text-2xl poppins mb-2">
                                Employee Reviews
                            </h3>
                            {/* <Rating /> */}
                        </div>
                        <button
                            onClick={handlePublish}
                            className="bg-green-400 mt-4 px-5 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-50 rounded-full hover:shadow-lg">
                            Publish
                        </button>
                        {showConfirmation && (
                            <div className="mt-4 p-4 bg-gray-200 dark:bg-gray-700 rounded">
                                <p className="text-md">Are you sure you want to publish the changes?</p>
                                <button
                                    onClick={confirmPublish}
                                    className="bg-green-400 mr-2 px-4 py-2 rounded-full">
                                    Yes
                                </button>
                                <button
                                    onClick={cancelPublish}
                                    className="bg-red-400 px-4 py-2 rounded-full">
                                    No
                                </button>
                            </div>
                        )}
                    </div>
                    <img
                        src={CSIImage}
                        alt="Crime Scene Investigator"
                        className="w-full md:w-1/3 rounded-md md:rounded-lg m-4 md:m-7"
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminJobDetails;
