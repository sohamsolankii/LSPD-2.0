import React, {createContext, useState} from 'react'

export const UserContext = createContext()

export function UserContextProvider({children}) {
    const [user, setUser] = useState(null)
    const [passkey, setPasskey] = useState(new Array(6).fill('')) 
	const [news, setNews] = useState(0)
	const [code, setCode] = useState('')

    return (
        <UserContext.Provider value={{user, setUser, passkey, setPasskey, news, setNews, code, setCode}}>
            {children}
        </UserContext.Provider>
    )
}
