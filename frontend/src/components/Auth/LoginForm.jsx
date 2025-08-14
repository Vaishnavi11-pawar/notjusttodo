import React from 'react'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Button from '../Layout/Button';

function LoginForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/v1/login', {email, password});
            const accessToken = response.data?.data?.accessToken;
            const username = response.data?.data?.user?.username;
            const owner = response.data?.data?.user?._id;

            if(accessToken) {
                localStorage.setItem('token', accessToken);
                localStorage.setItem('username', username);
                localStorage.setItem('owner', owner);
                console.log("logged in successfully");
                navigate('/');
            }

        } catch (error) {
            console.error("Error logging in: ", error);
        }
    }

  return (
    <>
    <div className='flex p-4 w-full max-w-6xl h-[90vh] items-center justify-center'>
        <div className='w-1/2 flex items-center justify-center p-2'>
            <h1 className='text-6xl font-bold text-gray-800 leading-tight'>
                Welcome Back<br />
                to <span className='text-indigo-800'>ToDo!</span>
            </h1>
        </div>
        <div className='w-1/2 flex items-center justify-center p-2'>
            <form onSubmit={handleLogin} className='bg-white max-w-lg w-full p-8 rounded-2xl shadow-xl'>
                <div className='flex flex-col items-center'>
                    <h2 className='text-3xl font-semibold text-gray-700 mb-6'>Login</h2>
                    
                        <input 
                            className='bg-blue-100 text-gray-700 mb-4 p-4 rounded-lg w-full outline-none'
                            type="email"
                            id='email'
                            placeholder='Enter email'
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />

                        <input 
                            className='bg-blue-100 text-gray-700 mb-4 p-4 rounded-lg w-full outline-none'
                            type="password" 
                            placeholder='Enter password' 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <Button type='submit'>Login</Button>
                    
                    <p className='text-gray-600 text-sm mt-6'>Don't have an account? 
                         <a className='text-indigo-700 underline ml-2' href="/register">
                            Register
                         </a>
                    </p>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}

export default LoginForm