import React, { useState } from 'react';
import Rating from '../career/Rating'; // Assuming you have a Reviews component
import CSIImage from '/src/assets/place.png';

const JobDetails = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`${darkMode ? 'dark' : ''}`}>
            <div className="bg-[var(--bg1)] dark:bg-[var(--dbg1)] min-h-screen text-[var(--lblue)] dark:text-[var(--dlgold)] p-4 md:p-12">
                <div className="flex flex-col md:flex-row items-center md:items-start bg-[var(--bg2)] dark:bg-[var(--dbg2)] rounded-2xl">

                    <div className="text-left w-full md:w-2/3 p-4 md:p-7">
                    <h1 className="text-2xl md:text-4xl poppins font-semibold text-[var(--lgold)] dark:text-[var(--dltext)]">
                        Crime Scene Investigator
                    </h1>
                    <h2 className="text-lg md:text-2xl poppins">
                            Forensics Department
                        </h2>
                        <hr className="h-px my-8 bg-gray-100 border-0 dark:bg-gray-700"></hr>
                        <p className="text-md md:text-xl poppins mb-4 text-[var(--ltext)] dark:text-[var(--dltext)]">
                            As a Crime Scene Investigator (CSI), you will be responsible for collecting, preserving, and analyzing physical evidence from crime scenes. Your work will play a crucial role in solving crimes and bringing justice to victims.
                        </p>
                        <h3 className="text-xl md:text-2xl poppins mb-2">
                            Responsibilities
                        </h3>
                        <ul className="list-disc list-inside poppins mb-4">
                            <li>Collect and preserve physical evidence from crime scenes.</li>
                            <li>Analyze evidence in the laboratory.</li>
                            <li>Prepare detailed reports on findings.</li>
                            <li>Testify in court as an expert witness.</li>
                        </ul>
                        <h3 className="text-xl md:text-2xl poppins mb-2">
                            Requirements
                        </h3>
                        <ul className="list-disc list-inside poppins mb-4">
                            <li>Bachelor's degree in Forensic Science, Criminal Justice, or a related field.</li>
                            <li>Experience in crime scene investigation or related field.</li>
                            <li>Strong analytical and observational skills.</li>
                            <li>Excellent written and verbal communication skills.</li>
                        </ul>
                        <div>
                    <h3 className="text-xl md:text-2xl poppins mb-2">
                        Employee Reviews
                    </h3>
                    <Rating />
                </div>
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

export default JobDetails;
