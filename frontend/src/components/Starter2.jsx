import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './Starter2.css'

const Starter2 = ({onEnter}) => {
    const [buttonText, setButtonText] = useState('Scroll down')
    const navigate = useNavigate()

    useEffect(() => {
        const handleScroll = () => {
            const scrollThreshold =
                document.documentElement.scrollHeight * 0.7 - window.innerHeight
            if (window.scrollY >= scrollThreshold) {
                setButtonText('Enter Website')
                document.querySelector('.centered-text').style.display = 'block'
            } else {
                setButtonText('Scroll down')
                document.querySelector('.centered-text').style.display = 'block'
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleClick = () => {
        // Reset scroll position
        window.scrollTo(0, 0)
        // Call the passed in onEnter function
        if (onEnter) onEnter()
        // Navigate to the '/' route
        navigate('/')
    }

    return (
        <div className="body">
            <div className="front-box">
                <div className="front"></div>
            </div>
            <div className="back-box">
                <div className="back"></div>
            </div>
            <div className="centered-text p-2 px-6 border-y-[2px] border-white poppins">
                <button onClick={handleClick}>{buttonText}</button>
            </div>
        </div>
    )
}

export default Starter2
