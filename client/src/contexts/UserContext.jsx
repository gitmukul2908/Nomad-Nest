import axios from "axios";
import { createContext, useEffect, useState } from "react"

export const UserContext = createContext({})

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false)

    // to check if user is not present we will fetch its information
    useEffect(() => {
        (async () => {
            if (!user) {
                const { data } = await axios.get('/profile')
                setUser(data)
                setReady(true)
            }
        })()
        
    }, [])


    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider


