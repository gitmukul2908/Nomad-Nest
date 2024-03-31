import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (ev) => {
        try {
            ev.preventDefault();
            await axios.post("/register", {
                name, email, password
            })

            alert('Registration Successful! Please Login Now');
        } catch (error) {
            alert("Invalid Credentials")
        }
    }

    return (
        <div className='mt-4 grow flex items-center justify-center'>
            <div className='mb-32'>
                <h1 className='text-4xl text-center mb-4'>Register</h1>
                <form className='max-w-md mx-auto'
                    onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='John Doe'
                        onChange={ev => setName(ev.target.value)} value={name} />
                    <input
                        type='email'
                        placeholder='xyz@email.com'
                        onChange={ev => setEmail(ev.target.value)}
                        value={email} />
                    <input
                        type="password"
                        placeholder='Enter Password here...'
                        onChange={ev => setPassword(ev.target.value)}
                        value={password} />
                    <button className='primary'>Register </button>
                </form>
                <div className='text-center mt-1 py-2 font-bold'>
                    Already have an account?
                    <Link className='text-primary underline mx-1' to={'/login'}>Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Register
