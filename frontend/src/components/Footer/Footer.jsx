import React from 'react'
import logo from '/src/assets/lspd-logo.png'

const Footer = () => {
    return (
        <footer className="dark:bg-white bg-[var(--bg2)] dark:hover:bg-gray-100 poppins">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a
                        href="/"
                        className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
                    >
                        <img src={logo} className="h-8" alt="LSPD Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-[var(--lgold)] dark:text-[var(--bg1)]">
                            LSPD EagleEye
                        </span>
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-300 sm:mb-0 dark:text-gray-600">
                        <li>
                            <a
                                href="#"
                                className="hover:text-[var(--lgold)] hover:dark:text-[var(--dltext)] me-4 md:me-6"
                            >
                                About
                            </a>
                        </li>
                        <li>
                            <a
                                href="/"
                                className="hover:text-[var(--lgold)] hover:dark:text-[var(--dltext)] me-4 md:me-6"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="/news"
                                className="hover:text-[var(--lgold)] hover:dark:text-[var(--dltext)] me-4 md:me-6"
                            >
                                News
                            </a>
                        </li>
                        <li>
                            <a
                                href="/"
                                className="hover:text-[var(--lgold)] hover:dark:text-[var(--dltext)]"
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-[var(--opac2)] sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-[var(--opac2)] sm:text-center dark:text-gray-400">
                    © 2024{' '}
                    <a href="/" className="hover:underline">
                        LSPD
                    </a>
                    . Created By Soham Solanki and Meet Suthar
                </span>
            </div>
        </footer>
    )
}

export default Footer
