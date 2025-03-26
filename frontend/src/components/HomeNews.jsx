import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import * as AiIcons from 'react-icons/ai'
import axios from 'axios'

const HomeNews = () => {
    const [news, setNews] = useState([])
    const [latestNews, setLatestNews] = useState(null)
    const [otherNews, setOtherNews] = useState([])

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('/api/v1/announcement')
                const fetchedNews = response.data.data

                if (fetchedNews.length > 0) {
                    setLatestNews(fetchedNews[0])
                    if (fetchedNews.length > 1) {
                        setOtherNews(fetchedNews.slice(1, 5))
                    }
                }
            } catch (error) {
                console.error('Error fetching news:', error)
            }
        }

        fetchNews()
    }, [])

    return (
        <div className="bg-[var(--bg1)] border-t-4 border-[var(--lgold)] dark:bg-white dark:border-[#2f9b9d] p-4 md:p-10">
            <div className="p-6 mb-6 text-center animate-appear blockanim">
                <h2 className="text-2xl md:text-4xl pricedown mb-2 text-[var(--lgold)] dark:text-[#2f9b9d]">
                    Latest News
                </h2>
                <p className="text-md md:text-xl poppins mb-4 text-[var(--ltext)] dark:text-[#66bea7]">
                    Stay updated with the latest news from our community.
                </p>
            </div>

            {latestNews && (
                <div className="poppins bg-[var(--opac)] animate-appear blockanim flex md:flex-row flex-col md:gap-6 gap-3 dark:bg-gray-100 border-[1px] border-[var(--opac)] dark:border-gray-200 dark:shadow-none shadow-black/60 shadow-2xl rounded-xl md:p-6 p-3">
                    <div className="flex flex-col md:gap-5 gap-3 md:w-2/3 w-full animate-appear blockanim">
                        <div className="relative">
                            <img
                                src={latestNews.image}
                                alt={latestNews.title}
                                className="rounded-lg border-[1px] border-[var(--bg1)] shadow-lg w-full h-96 object-cover"
                            />
                            <div className="absolute top-0 left-0 bg-[var(--lgold)] border-[1px] border-[var(--bg1)] shadow-lg shadow-black/60 text-[var(--bg1)] px-2 rounded-br-lg">
                                Latest
                            </div>
                            <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black to-transparent w-full rounded-b-lg">
                                <h2 className="text-lg md:text-xl font-bold text-white">
                                    {latestNews.title}
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:w-1/3 w-full gap-4">
                        {otherNews.map((news, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-4 bg-[var(--opac)] dark:bg-white border-[1px] border-[var(--opac)] shadow-black/30 shadow-lg dark:shadow-none dark:border-gray-200 rounded-lg p-2"
                            >
                                <img
                                    src={news.image}
                                    alt={news.title}
                                    className="w-20 h-20 rounded-lg object-cover"
                                />
                                <h2 className="text-md md:text-lg font-bold text-[var(--ltext)] dark:text-gray-500">
                                    {news.title}
                                </h2>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="md:col-span-2 pt-10 pb-6 md:pb-0 flex justify-center poppins">
                <Link to="/news" className="news-button">
                    <button
                        type="button"
                        className="p-2 px-5 border-[1px] border-[var(--opac)] h-[40px] rounded-md bg-[var(--bg4op)] dark:bg-[#2f9b9d] backdrop-blur-md shadow-black/30 hover:shadow-black/40 hover:bg-[var(--opac)] hover:dark:bg-[var(--bg1)] shadow-md hover:shadow-xl text-gray-200 dark:text-[#f5e7a1] flex items-center justify-center"
                    >
                        More News <AiIcons.AiOutlineRight className="ml-2" />
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default HomeNews
