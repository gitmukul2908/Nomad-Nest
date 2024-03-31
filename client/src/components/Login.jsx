import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from "axios"
import { UserContext } from '../contexts/UserContext'

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false)

  const handleSubmit = async (ev) => {
    try {
      ev.preventDefault();
      const { data } = await axios.post("/login", {
        email, password
      })
      alert("Login Successful")
      setUser(data)
      setRedirect(true)

    } catch (error) {
      alert("Login Failed");
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div className='mt-4 grow flex items-center justify-center'>
      <div className='mb-32'>
        <h1 className='text-4xl text-center mb-4'>Login</h1>
        <form className='max-w-md mx-auto' onSubmit={handleSubmit}>
          <input type='email' placeholder='xyz@email.com' onChange={ev => setEmail(ev.target.value)} />
          <input type="password" placeholder='Enter Password here...' onChange={ev => setPassword(ev.target.value)} />
          <button className='primary'>Login</button>
        </form>
        <div className='text-center mt-1 py-2 font-bold'>
          Don't have an account? <Link className='text-primary underline' to={'/register'}>Register</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
