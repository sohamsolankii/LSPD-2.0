import React, {useState, useEffect, useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import DarkModeRoundedIcon from '@mui/icons-material/Brightness7Sharp'
import LightModeIcon from '@mui/icons-material/Brightness4'
import {IconContext} from 'react-icons'
import logo from '/src/assets/lspd-logo.png'
import './Navbar.css'
import {UserContext} from '../../context/userContext'
import axios from 'axios'
import {PiSignInBold} from 'react-icons/pi'
import Sidebar from './Sidebar'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'

const Navbar = ({isAdmin = false}) => {
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [sidebar, setSidebar] = useState(false)
    const [popupVisible, setPopupVisible] = useState(false)
    const {user, setUser, passkey, setPasskey} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        // Fetch user data from cookies
        const storedUser = Cookies.get('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }

        // Fetch passkey from cookies
        const storedPasskey = Cookies.get('adminPasskey')
        if (storedPasskey) {
            setPasskey(JSON.parse(storedPasskey))
        }
    }, [setUser, setPasskey])

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark', 'theme-transition')
        } else {
            document.documentElement.classList.remove(
                'dark',
                'theme-transition',
            )
        }
    }, [isDarkMode])

    const logout = async () => {
        try {
            await axios.get('/api/v1/auth/logout')
            toast.success(
                `Goodbye, rookie! You've successfully logged out. Stay safe out there!`,
                {
                    className:
                        'bg-[var(--opac)] mx-4 poppins pricedown font-medium text-[#94a3b8] rounded-lg shadow-md rounded-2xl backdrop-blur-sm border-1 border-[#475569] w-[80%] md:w-[60%] lg:w-[25%]',
                },
            )
            setUser(null)
            Cookies.remove('user') // Remove user data from cookies
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }

    const adminLogout = async () => {
        try {
            const response = await axios.get('/api/v1/auth/admin-logout', {
                withCredentials: true,
            })
            if (response.status === 200) {
                toast.success(
                    `Goodbye, officer! You've successfully logged out. Stay safe out there!`,
                    {
                        className:
                            'bg-[var(--opac)] mx-4 poppins pricedown font-medium text-[#94a3b8] rounded-lg shadow-md rounded-2xl backdrop-blur-sm border-1 border-[#475569] w-[80%] md:w-[60%] lg:w-[25%]',
                    },
                )
                setPasskey(new Array(6).fill(''))
                Cookies.remove('adminPasskey') // Remove passkey data from cookies
                navigate('/')
            } else {
                toast.error('Failed to log out. Please try again.')
            }
        } catch (err) {
            console.log(err)
            toast.error(
                'An error occurred while logging out. Please try again.',
            )
        }
    }

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode)
    }

    const showSidebar = () => setSidebar(!sidebar)
    const togglePopup = () => setPopupVisible(!popupVisible)

    return (
        <IconContext.Provider value={{color: '#fff'}}>
            <div className={`navbar ${sidebar ? 'sidebar-active' : ''}`}>
                <div className="flex justify-between poppins items-center p-3 fixed w-full top-0 z-50 bg-[var(--bg2op)] dark:bg-[var(--dbg2op)] backdrop-blur-xl border-b-4 border-[var(--lgold)] dark:border-[var(--dltext)] text-white">
                    <Link
                        to="#"
                        className="menu-bars ml-3 group"
                        onClick={showSidebar}
                    >
                        <MenuIcon
                            sx={{fontSize: 25, md: {fontSize: 30}}}
                            className="text-[var(--lgold)] dark:text-[var(--dltext)] group-hover:text-[var(--lblue)] dark:group-hover:text-[var(--dlblue)] transition-colors duration-300"
                        />
                    </Link>

                    <Link
                        to={
                            !passkey || passkey.every((digit) => digit === '')
                                ? '/'
                                : '/admin'
                        }
                        className="flex items-center text-xl md:text-2xl font-bold sm:text-[var(--lgold)] text-[var(--lblue)] sm:dark:text-[var(--dltext)] dark:text-[var(--dlblue)]"
                    >
                        <img
                            src={logo}
                            alt="LSPD Logo"
                            className="invisible md:visible h-8 md:h-10 mr-2"
                        />
                        {!passkey || passkey.every((digit) => digit === '') ? (
                            'LSPD EagleEye'
                        ) : (
                            <>
                                <span className="relative">
                                    LSPD EagleEye
                                    <span className="bg-[var(--lgold)] text-lg dark:bg-[var(--dltext)] text-[var(--bg1)] dark:text-[var(--dbg1)] px-2 py-0 rounded-md shadow-lg hidden md:inline-block">
                                        <b>ADMIN</b>
                                    </span>
                                </span>
                                <Link to="/press" className="relative">
                                    <span className="bg-[var(--lgold)] text-lg dark:bg-[var(--dltext)] text-[var(--bg1)] dark:text-[var(--dbg1)] px-2 py-0 rounded-md shadow-lg hidden md:inline-block">
                                        <b>Live Press</b>
                                    </span>
                                </Link>
                            </>
                        )}
                    </Link>

                    <div className="flex items-center gap-4 md:gap-7 pr-4 md:pr-6">
                        {isDarkMode ? (
                            <button onClick={toggleTheme} className="group">
                                <LightModeIcon
                                    sx={{fontSize: 25, md: {fontSize: 30}}}
                                    className="text-[var(--lgold)] dark:text-[var(--dltext)] group-hover:text-[var(--lblue)] dark:group-hover:text-[var(--dlblue)] transition-colors duration-300"
                                />
                            </button>
                        ) : (
                            <button onClick={toggleTheme} className="group">
                                <DarkModeRoundedIcon
                                    sx={{fontSize: 25, md: {fontSize: 30}}}
                                    className="text-[var(--lgold)] group-hover:text-[var(--lblue)] transition-colors duration-300"
                                />
                            </button>
                        )}
                        {!user &&
                        (!passkey || passkey.every((digit) => digit === '')) ? (
                            <Link to="/register" className="group">
                                <PersonRoundedIcon
                                    sx={{fontSize: 25, md: {fontSize: 30}}}
                                    className="text-[var(--lgold)] dark:text-[var(--dltext)] group-hover:text-[var(--lblue)] dark:group-hover:text-[var(--dlblue)] transition-colors duration-300"
                                />
                            </Link>
                        ) : user ? (
                            <div className="relative">
                                <button onClick={togglePopup} className="group">
                                    <PersonRoundedIcon
                                        sx={{fontSize: 25, md: {fontSize: 30}}}
                                        className="text-[var(--lgold)] dark:text-[var(--dltext)] group-hover:text-[var(--lblue)] dark:group-hover:text-[var(--dlblue)] transition-colors duration-300"
                                    />
                                </button>
                                {popupVisible && (
                                    <div className="absolute poppins right-0 mt-2 w-72 bg-[var(--bg1l)] border-[1px] border-[var(--opac2)] shadow-black/70 shadow-2xl rounded-lg p-3">
                                        <div className="flex relative text-lg justify-between items-center text-[var(--lgold)]">
                                            <span>Hello, {user.name}!</span>
                                        </div>
                                        <Link
                                            to="/"
                                            onClick={logout}
                                            className="flex justify-between text-sm items-center hover:bg-[var(--bg2)] mt-2 p-2 rounded-md border-[1px] border-[var(--opac2)] shadow-black/50 shadow-xl hover:text-red-400"
                                        >
                                            <span>Sign Out</span>
                                            <PiSignInBold className="ml-4" />
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="relative">
                                <button onClick={togglePopup} className="group">
                                    <PersonRoundedIcon
                                        sx={{fontSize: 25, md: {fontSize: 30}}}
                                        className="text-[var(--lgold)] dark:text-[var(--dltext)] group-hover:text-[var(--lblue)] dark:group-hover:text-[var(--dlblue)] transition-colors duration-300"
                                    />
                                </button>
                                {popupVisible && (
                                    <div className="absolute poppins right-0 mt-2 w-72 bg-[var(--bg1l)] border-[1px] border-[var(--opac2)] shadow-black/70 shadow-2xl rounded-lg p-3">
                                        <div className="flex relative text-lg justify-between items-center text-[var(--lgold)]">
                                            <span>Hello, Admin!</span>
                                        </div>
                                        <Link
                                            to="/"
                                            onClick={adminLogout}
                                            className="flex justify-between text-sm items-center hover:bg-[var(--bg2)] mt-2 p-2 rounded-md border-[1px] border-[var(--opac2)] shadow-black/50 shadow-xl hover:text-red-400"
                                        >
                                            <span>Sign Out</span>
                                            <PiSignInBold className="ml-4" />
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <Sidebar sidebar={sidebar} showSidebar={showSidebar} />
            </div>
        </IconContext.Provider>
    )
}

export default Navbar
