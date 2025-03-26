import React, {useContext} from 'react'
import {UserContext} from '../../context/userContext'
// import LSPDLogo from '/src/assets/lspd-logo.png'
// import AdminStarter from '../AdminStarter';  // Create a similar starter for admin if necessary
// import AdminWantedList from './AdminWantedList';  // Admin specific component for CRUD operations

const adminDashboardData = [
    {
        image: '/src/assets/admin/1.jpeg',
        url: '/admin/most-wanted',
        title: 'Manage Most Wanted Profiles',
        description:
            'Oversee, update, and manage the Most Wanted list for LSPD.',
    },
    {
        image: '/src/assets/admin/2.jpeg',
        url: '/admin/jobs',
        title: 'Post and Manage Job Listings',
        description: 'Create and maintain job opportunities within the LSPD.',
    },
    {
        image: '/src/assets/admin/3.jpeg',
        url: '/admin/jobs/applications',
        title: 'Review and Approve Applications',
        description:
            'Evaluate job applications and select qualified candidates.',
    },
    {
        image: '/src/assets/admin/4.jpeg',
        url: '/admin/news',
        title: 'Manage News and Alerts',
        description:
            'Publish, edit, and remove news updates and public alerts.',
    },
    {
        image: '/src/assets/admin/5.jpeg',
        url: '/admin/show-tips',
        title: 'Review User-Submitted Tips',
        description: 'Access and manage tips submitted by the public.',
    },
    {
        image: '/src/assets/admin/6.jpeg',
        url: '/admin/crime-reports',
        title: 'Manage Crime Reports',
        description: 'Review and address submitted crime complaints.',
    },
]

const AdminDashboard = () => {
    const {user, setUser} = useContext(UserContext)
    // console.log("User form Admin: ",user);

    return (
        <div className="bg-[var(--bg1)] pb-20 gradMesh dark:gradMeshLight dark:moveBackground text-[var(--lblue)] dark:bg-[var(--dbg1)] dark:text-[var(--dlgold)] min-h-screen">
            {' '}
            {/* <AdminStarter /> */}
            <section className="p-4 md:p-6">
                <div className="text-center m-2 md:m-8 p-4 md:p-6">
                    <h2 className="text-3xl md:text-5xl pricedown text-[var(--lblue)] dark:text-[var(--dltext)] mb-2 md:mb-4">
                        Admin Dashboard
                    </h2>
                    <p className="text-lg md:text-2xl poppins mb-2 text-[var(--ltext)] dark:text-white">
                        Manage Everything in Los Santos with Ease and Precision
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {adminDashboardData.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => (window.location.href = item.url)}
                            className="flex cursor-pointer bg-[var(--opac)] dark:bg-white p-4 rounded-2xl shadow-black/40 shadow-2xl border-[1px] border-[var(--opac)] dark:border-[var(--whiteop)] dark:border-[1px] text-left items-center transform transition-transform duration-300 hover:bg-[var(--opac2)] hover:dark:bg-white"
                        >
                            <img
                                src={item.image}
                                alt={`Image ${index + 1}`}
                                className="w-1/3 cursor-pointer md:w-1/5 border-[1px] border-[var(--opac2)] shadow-black/30 shadow-xl rounded-lg mr-4 md:mr-6"
                            />
                            <div>
                                <h3
                                    className={`font-bold text-[var(--lgold)] dark:text-blue-700 cursor-pointer text-lg md:text-2xl mb-1 md:mb-2 poppins`}
                                >
                                    {item.title}
                                </h3>
                                <p className="text-[var(--ltext)] cursor-pointer dark:text-[var(--dlblue)] poppins text-sm md:text-lg">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                    <div
                        // key={index}
                        onClick={() => (window.location.href = '/press')}
                        className="flex reflection col-span-1 md:col-span-2 w-[100%] cursor-pointer bg-[var(--opac)] dark:bg-white p-4 rounded-2xl shadow-black/40 shadow-2xl border-[1px] border-[var(--opac)] dark:border-[var(--whiteop)] dark:border-[1px] text-left items-center transform transition-transform duration-300 hover:bg-[var(--opac2)] hover:dark:bg-white"
                    >
                        <img
                            src="/src/assets/admin/2.jpeg"
                            alt={`Image`}
                            className="w-1/3 cursor-pointer md:w-[10%] border-[1px] border-[var(--opac2)] shadow-black/30 shadow-xl rounded-lg mr-4 md:mr-6"
                        />
                        <div>
                            <h3
                                className={`font-bold text-[var(--lgold)] dark:text-blue-700 cursor-pointer text-lg md:text-2xl mb-1 md:mb-2 poppins`}
                            >
                                Live Video Press Conference
                            </h3>
                            <p className="text-[var(--ltext)] cursor-pointer dark:text-[var(--dlblue)] poppins text-sm md:text-lg">
                                Start connecting with people.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:gap-6"></div>
            </section>
            {/* <AdminWantedList />  Include admin-specific component for managing most wanted list */}
        </div>
    )
}

export default AdminDashboard
