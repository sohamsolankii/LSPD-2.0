import React from 'react'
import {useEffect, useRef} from 'react'
import LSPDLogo from '/src/assets/lspd-logo.png'

const AudioPlayer = () => {
    const audioRef = useRef(null)

    useEffect(() => {
        const audioElement = audioRef.current
        if (audioElement) {
            audioElement.play().catch((error) => {
                console.log('Autoplay prevented:', error)
            })
        }
    }, [])

    return (
        <audio
            ref={audioRef}
            src="/src/assets/videobg.mp3"
            type="audio/mp3"
            autoPlay
            loop={false}
            // muted // Muting the audio to allow autoplay
            controls={false}
        ></audio>
    )
}

const Starter = () => {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <video
                className="absolute inset-0 object-cover w-full h-full"
                src="/src/assets/videobg.mp4"
                type="video/mp4"
                autoPlay
                loop={false}
                muted
            ></video>
            <AudioPlayer />
            <div className="absolute inset-0 bg-[var(--bg1)] opacity-30 dark:bg-white dark:opacity-30"></div>{' '}
            <div className="relative flex flex-col md:flex-row items-center justify-center text-white w-full max-w-screen-xl px-4 md:px-10">
                <img
                    src={LSPDLogo}
                    alt="LSPD logo"
                    className="w-1/2 md:w-1/4 mb-6 md:mb-0 md:mr-10"
                />
                <div className="text-center md:text-left">
                    <h1 className="text-6xl pricedown md:text-6xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 pb-4 via-yellow-200 to-yellow-400">
                        <svg
                            className="sv"
                            viewBox="0 0 700 100"
                            preserveAspectRatio="xMinYMid meet"
                        >
                            <text
                                x="50%"
                                y="50%"
                                textAnchor="middle"
                                dy=".35em"
                            >
                                Welcome to LSPD EagleEye
                            </text>
                        </svg>
                    </h1>
                    <p className="text-lg poppins md:text-2xl text-[var(--ltext)] mt-4">
                        Your Digital Hotline for All Things Los Santos! (Yes,
                        Even the Crazy Stuff)
                    </p>
                    <div className="animate-bounce mt-10">
                        <svg
                            className="w-10 h-10 text-white mx-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            ></path>
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Starter
