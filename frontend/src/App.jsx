import React from 'react'
import axios from 'axios'
import {Outlet, useLocation} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import Navbar from './components/Header/Navbar.jsx'
import {UserContextProvider} from './context/userContext.jsx'
import ChatbotContainer from './components/chatbot/ChatbotContainer'

axios.defaults.baseURL = 'http://localhost:8000/'
axios.defaults.withCredentials = true

const App = () => {
    const {pathname} = useLocation()

    const hideNavbarPaths = [
        '/login',
        '/register',
        '/admin-login',
        '/forgot-password',
        '/reset',
        '/para',
    ]
    const shouldHideNavbar = hideNavbarPaths.includes(pathname)

    return (
        <UserContextProvider>
            {!shouldHideNavbar && <Navbar />}
            <Toaster position="top-right" toastOptions={{duration: 2000}} />
            <Outlet />
            <ChatbotContainer />
        </UserContextProvider>
    )
}

export default App
