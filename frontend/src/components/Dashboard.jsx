import React, {useContext} from 'react'
// import GradBG from '../MeshGradien	tBackground'

const dashboardData = [
    {
        image: '/src/assets/wanted.png',
        title: 'Most Wanted List',
        description: 'Catch Them if You Can (But Maybe Don’t Try Too Hard)',
    },
    {
        image: '/src/assets/tip.png',
        title: 'Submit a Tip',
        description:
            'Got a Hot Tip? Let Us Know (or Just Gossip, We’re Not Judging)',
    },
    {
        image: '/src/assets/careers.png',
        title: 'Careers at LSPD',
        description:
            'From Rookie to All-Star Cop – Start Your Journey in Los Santos',
    },
    {
        image: '/src/assets/news.png',
        title: 'News and Alerts',
        description: 'Stay Informed on the Latest in Los Santos',
    },
]

const Dashboard = () => {
    return (
        <div className="bg-[var(--bg1)] gradMesh dark:gradMeshLight moveBackground text-[var(--lblue)] dark:bg-[var(--dbg1)] dark:text-[var(--dlgold)] min-h-screen">
            <section className="p-4 md:p-12">
                <div className="text-center m-4 md:m-8 p-2 md:p-12 animate-appear blockanim">
                    <h2 className="text-2xl md:text-5xl pricedown text-[var(--lblue)] dark:text-[var(--dltext)] mb-2 md:mb-4">
                        Welcome to LSPD Eagle-eye
                    </h2>
                    <p className="text-sm md:text-2xl poppins mb-2 text-[var(--ltext)] dark:text-[var(--bg1l)]">
                        Your Digital Hotline for All Things Los Santos! (Yes,
                        Even the Crazy Stuff)
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-8 ">
                    {dashboardData.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                index === 0
                                    ? (window.location.href = '/most-wanted')
                                    : index === 1
                                      ? (window.location.href = '/submit-tip')
                                      : index === 2
                                        ? (window.location.href = '/career')
                                        : (window.location.href = '/news')
                            }}
                            className="flex animate-appear blockanim cursor-pointer bg-[var(--opac)] dark:bg-[var(--whiteop)] p-4 rounded-2xl shadow-black/40 shadow-2xl border-[1px] border-[var(--opac)] dark:shadow-none dark:border-[var(--whiteop)] dark:border-[1px] text-left items-center transform transition-transform duration-300 hover:bg-[var(--opac2)] hover:dark:bg-white"
                        >
                            <img
                                src={item.image}
                                alt={`Image ${index + 1}`}
                                className="w-1/3 cursor-pointer md:w-1/6 rounded-lg shadow-xl mr-4 md:mr-6"
                            />
                            <div className="animate-appear blockanim">
                                <h3
                                    className={`pricedown cursor-pointer text-lg md:text-4xl mb-1 md:mb-2 ${item.title === 'Most Wanted List' || item.title === 'News and Alerts' ? 'text-[var(--lgold)] dark:text-[var(--dltext)]' : 'dark:text-[var(--dltext)]'}`}
                                >
                                    {item.title}
                                </h3>
                                <p className="text-[var(--ltext)] cursor-pointer dark:text-[var(--dlblue)] poppins text-sm md:text-xl">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="animate-appear blockanim bg-[var(--opac)] border-[1px] border-[var(--opac)] md:flex block dark:bg-[var(--whiteop)] p-4 md:p-12 rounded-2xl shadow-black/40 shadow-2xl text-left mt-4 md:mt-8 mb-4 md:mb-10">
                    <div className="lg:w-2/3 w-[100%] animate-appear blockanim pr-0 lg:pr-10 pb-5 lg:pb-0">
                        <h3 className="text-lg md:text-4xl pricedown text-[var(--lgold)] dark:text-[var(--dltext)] font-bold mb-4">
                            Why LSPD Eagle-eye?
                        </h3>
                        <p className="my-2 poppins md:my-8 text-[var(--ltext)] dark:text-[var(--dlblue)] text-sm md:text-xl">
                            The LSPD Eagle-eye portal was created to connect the
                            Los Santos Police Department with its vibrant
                            community. In a dynamic and unpredictable city like
                            Los Santos, staying ahead requires more than just
                            police presence; it needs the vigilance of every
                            citizen. This user-friendly portal allows residents
                            to report crimes, share tips, and stay informed
                            about local safety issues. By harnessing community
                            input, LSPD Eagle-eye aims to enhance public safety,
                            build trust, and ensure a responsive and transparent
                            police force. Whether it’s suspicious activity or
                            crucial information, your input can make a
                            difference.
                        </p>
                        <p className="mb-2 poppins md:mb-8 text-[var(--ltext)] text-sm dark:text-[var(--dlblue)] md:text-xl">
                            Join us in keeping Los Santos safe and lively, one
                            tip at a time!
                        </p>
                    </div>
                    <div className="w-[100%] lg:w-1/3">
                        <img
                            src="/src/assets/place.png"
                            alt="Place"
                            className="md:rounded-xl rounded-lg shadow-xl"
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Dashboard
