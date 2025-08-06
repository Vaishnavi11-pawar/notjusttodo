import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Layout/Button'; 

function RegisterForm() {

    const [formData, setFormData] = useState({username:'', email:'', password:''});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev, [e.target.name]: e.target.value
        }));
    }
    const handleRegister = async(e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const res = await axios.post('api/v1/register', formData);
            console.log("Registration successfull: ", res.data);
            setSuccess('user register successfully.');
            navigate('/login');
            setFormData({username:'', email:'', password:''});
            
        } catch (error) {
            console.log('Registration failed: ', error);
            const errormsg = error.response?.data?.message || "Something went wrong";
            setError(errormsg)
        }
    }

  return (

    <div className='flex items-center justify-center'>
        <form className='bg-white max-w-lg w-full p-8 rounded-2xl shadow-xl h-[55vh] ' onSubmit={handleRegister}>
            <h2 className='text-3xl font-semibold text-center text-gray-700 mb-6'>Register</h2> 
            <input
                className='bg-blue-100 text-gray-700 mb-4 p-3 rounded-lg w-full outline-none'
                type="text"
                name="username" 
                placeholder='Username' 
                value={formData.username} 
                onChange={handleChange} 
                required
            />
            <input
                className='bg-blue-100 text-gray-700 mb-4 p-3 rounded-lg w-full outline-none' 
                type="email" 
                name="email" 
                placeholder='Email' 
                value={formData.email} 
                onChange={handleChange} 
                required
            />
            <input
                className='bg-blue-100 text-gray-700 mb-4 p-3 rounded-lg w-full outline-none' 
                type="password" 
                name="password" 
                placeholder='Password' 
                value={formData.password} 
                onChange={handleChange} 
                required
            />
            <Button type='submit'>Register</Button>
            <p className='text-gray-600 text-sm mt-6 text-center'>Already register? 
                <a className='text-indigo-700 underline ml-2' href="/login">
                    Login
                </a>
            </p>
        </form>
    </div>
  )
}

export default RegisterForm