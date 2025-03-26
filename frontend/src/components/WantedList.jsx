import React, {useEffect, useState} from 'react'
import {Element} from 'react-scroll'
import styled, {keyframes, css} from 'styled-components'
import {Link} from 'react-router-dom'
import axios from 'axios'

const WantedList = () => {
    const [characters, setCharacters] = useState([])

    useEffect(() => {
        const fetchWantedUsers = async () => {
            try {
                const response = await axios.get(
                    '/api/v1/wanted/fetch-wantedUsers',
                    {
                        withCredentials: true,
                    },
                )
                const data = response.data.data
                setCharacters(data.slice(0, 6))
            } catch (error) {
                console.error('Error fetching wanted users:', error)
            }
        }

        fetchWantedUsers()
    }, [])

    return (
        <div className="bg-[var(--bg1)] text-[var(--lblue)] dark:bg-white dark:text-[var(--dlblue)] min-h-screen">
            <section className="bg-[var(--bg2)] dark:bg-[var(--dbg2)]">
                <img
                    src="/src/assets/element.png"
                    alt="Do Not Cross"
                    className="animate-pulse w-full z-50 blockanim2 appear2"
                />
            </section>
            <section className="relative flex flex-col items-center justify-center bg-[var(--bg2)] dark:bg-[var(--dbg2)]">
                <div className="relative text-center md:p-20 p-7">
                    <h1 className="md:text-3xl text-lg poppins font-medium text-[var(--ltext)] dark:text-[var(--dltext)] md:m-12 m-3 mt-3 md:mt-20">
                        You didn’t obey the rule, huh? Just kidding... Welcome
                        to the 'Most Wanted' list! Check out these notorious
                        troublemakers
                    </h1>
                    <p className="md:text-5xl text-2xl sign mb-3 md:mb-10 text-[var(--lblue)] dark:text-[var(--dlblue)]">
                        and remember - crime doesn't pay (unless you're in GTA
                        V!)
                    </p>
                </div>
            </section>
            <Element
                name="mostWanted"
                className="border-t-4 border-[var(--lgold)] dark:border-[var(--dltext)] py-8 px-4"
            >
                <div className="flex flex-col items-center">
                    <div className="text-center">
                        <div className="p-6 mb-6">
                            <h2 className="text-2xl md:text-4xl pricedown mb-4 text-[var(--lgold)] dark:text-[var(--dltext)]">
                                Los Santos' Most Wanted Criminals
                            </h2>
                            <p className="text-md md:text-xl poppins mb-4 text-[var(--ltext)] dark:text-[var(--dltext)]">
                                Catch Them if You Can (But Maybe Don’t Try Too
                                Hard)
                            </p>
                        </div>
                        <Marquee>
                            <MarqueeGroup>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 m-4 mb-8">
                                    {characters.map((character) => (
                                        <div
                                            key={character._id}
                                            className="bg-[var(--opac)] dark:bg-gray-100 rounded-xl hover:dark:bg-white p-3 text-[var(--ltext)] text-[var(--ltext)] hover:text-[var(--lgold)] dark:text-[var(--dltext)] hover:shadow-4xl transition-transform duration-300 border-[1px] border-[var(--opac)] shadow-black/70 shadow-lg hover:bg-[var(--opac2)] dark:shadow-none dark:border-gray-300 hoaver:dark:bg-gray-100"
                                        >
                                            <img
                                                src={character.image}
                                                alt={character.user}
                                                className="w-full h-[260px] rounded-md mb-3 object-cover"
                                            />
                                            <h3 className="text-md text-left poppins font-medium">
                                                {character.user}
                                            </h3>
                                        </div>
                                    ))}
                                </div>
                            </MarqueeGroup>
                            <MarqueeGroup2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 m-4 mb-8">
                                    {characters.map((character) => (
                                        <div
                                            key={character._id}
                                            className="bg-[var(--opac)] rounded-xl dark:bg-gray-100 hover:dark:bg-white p-3 text-[var(--ltext)] text-[var(--ltext)] hover:text-[var(--lgold)] dark:text-[var(--dltext)] hover:shadow-4xl transition-transform duration-300 border-[1px] border-[var(--opac)] shadow-black/70 shadow-lg hover:bg-[var(--opac2)] dark:shadow-none dark:border-gray-300 hoaver:dark:bg-gray-100"
                                        >
                                            <img
                                                src={character.image}
                                                alt={character.user}
                                                className="w-full h-[260px] rounded-md mb-3 object-cover"
                                            />
                                            <h3 className="text-md text-left poppins font-medium text-[var(--ltext)] dark:text-[var(--dltext)]">
                                                {character.user}
                                            </h3>
                                        </div>
                                    ))}
                                </div>
                            </MarqueeGroup2>
                        </Marquee>
                        <div className="mt-6 p-10">
                            <Link to="/most-wanted">
                                <button className="text-lg md:text-xl poppins dark:bg-[var(--dltext)] dark:shadow-md bg-[var(--opac)] text-[var(--ltext)] dark:text-white py-2 px-8 md:px-20 rounded-lg shadow-black/40 border-[1px] border-[var(--opac)] shadow-xl hover:shadow-black/70 hover:shadow-2xl hover:text-[var(--bg1)] hover:dark:text-[var(--dbg1)] hover:font-medium hover:bg-[var(--lgold)] hover:dark:bg-[var(--dlblue)] transition ease-in-out duration-1500">
                                    Check out entire list
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Element>
        </div>
    )
}

export default WantedList

const Marquee = styled.div`
    display: flex;
    width: 100%;
    overflow: hidden;
    user-select: none;
    mask-image: linear-gradient(
        to right,
        hsl(0 0% 0% / 0),
        hsl(0 0% 0% / 1) 10%,
        hsl(0 0% 0% / 1) 90%,
        hsl(0 0% 0% / 0)
    );
`

const scrollX = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`

const common = css`
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    white-space: nowrap;
    width: 100%;
    animation: ${scrollX} 12s linear infinite;
`

const MarqueeGroup = styled.div`
    ${common}
`

const MarqueeGroup2 = styled.div`
    ${common}
`
