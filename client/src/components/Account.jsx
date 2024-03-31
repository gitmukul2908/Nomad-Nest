import React, { useContext, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import AccountNav from './AccountNav'

const Account = () => {
    const [redirect, setRedirect] = useState(null)
    const { user, ready, setUser } = useContext(UserContext)

    const logout = async () => {
        await axios.post('/logout')
        setUser(null)
        setRedirect('/')
        alert('Logged out successfully');
    }

    if (!ready) {
        return 'Loading...'
    }

    if (ready && !user) {
        return <Navigate to={'/login'} />
    }

    if (redirect) {
        <Navigate to={redirect} />
    }


    return (
        <div>
            <AccountNav />

            <div className='text-center max-w-lg mx-auto'>
                Logged In as {user.name} ({user.email}) <br />
                <button onClick={logout} className='primary max-w-sm mt-2'>Logout</button>
            </div>

        </div>
    )
}

export default Account
