import React, {useState} from 'react'
import axios from 'axios'

const Chatbot = () => {
    const [userInput, setUserInput] = useState('')
    const [chatHistory, setChatHistory] = useState([])
    const [loading, setLoading] = useState(false)

    const sendMessage = async (event) => {
        event.preventDefault()
        if (!userInput.trim()) return

        const newChatHistory = [
            ...chatHistory,
            {user: 'You', message: userInput},
        ]
        setChatHistory(newChatHistory)
        setUserInput('')
        setLoading(true)

        try {
            const response = await axios.post('/api/v1/chat', {userInput})
            setChatHistory([
                ...newChatHistory,
                {user: 'Trevor Salamanca', message: response.data.response},
            ])
        } catch (error) {
            console.error('Error:', error) // Log the full error object
            setChatHistory([
                ...newChatHistory,
                {
                    user: 'System',
                    message: 'Error sending message. Please try again later.',
                },
            ])
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="rounded-l-xl shadow-lg h-[100%] font-regular text-gray-200 text-sm p-6 w-full max-w-md bg-[var(--opac2)] dark:bg-[var(--bg1lop)] backdrop-blur-xl border-[1px] border-[var(--opac2)] dark:border-[var(--bg1lop)]">
            <div className="overflow-y-auto h-96 mb-4">
                {chatHistory.map((chat, index) => (
                    <div
                        key={index}
                        className={`mb-2 ${chat.user === 'You' ? 'text-right' : 'text-left'}`}
                    >
                        <div
                            className={`inline-block p-2 rounded-lg border-[1px] shadow-xl ${chat.user === 'You' ? 'bg-[var(--opac2)] border-[var(--opac2)]' : 'bg-[var(--lgop)] border-[var(--lgop)]'}`}
                        >
                            <strong>{chat.user}</strong>
                            <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                            <h3 className="text-xs">{chat.message}</h3>
                        </div>
                    </div>
                ))}
            </div>
            <form
                onSubmit={sendMessage}
                className="flex rounded-lg shadow-black/50 shadow-xl"
            >
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="flex-grow border-[1px] text-gray-300 text-sm border-[var(--bg5op)] bg-[var(--bg5op)] p-2 rounded-l-lg focus:outline-none focus:border-gray-500"
                    placeholder="Enter your message"
                />
                <button
                    type="submit"
                    className="bg-[var(--opac)] hover:bg-[var(--bg2op)] text-white px-3 border-[1px] text-sm border-[var(--bg5op)] rounded-r-lg"
                >
                    {loading ? 'Sending...' : 'Send'}
                </button>
            </form>
            {loading && <div className="text-center mt-4">Loading...</div>}
        </div>
    )
}

export default Chatbot
