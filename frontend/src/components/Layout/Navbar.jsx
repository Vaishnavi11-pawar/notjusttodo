import React from 'react'
import { useNavigate } from 'react-router-dom';
import logopng from "../../assets/Todologo.png";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.post('/api/v1/logout',
         {},
        { withCredentials: true } //send cookies so backend can clear them.
      );

      localStorage.removeItem('token');
      localStorage.removeItem('username');

      navigate('/login');

    } catch (error) {
      
    }
  }
  return (
    <div className='flex justify-around items-center p-6 shadow text-white h-16 bg-gray-50'>
      <div>
        <h1 className='text-4xl font-bold text-indigo-800'>ToDo</h1>
      </div>
      <div className='flex items-center gap-8'>
        <h3 className='text-base font-semibold text-black cursor-pointer hover:text-indigo-800'>Home</h3>
        <h3 className='text-base font-semibold text-black cursor-pointer hover:text-indigo-800'>My Tasks</h3>
        <button 
          className='bg-white border-2 border-gray-400 text-indigo-700 hover:border-indigo-700 hover:shadow-cyan-50 font-semibold py-2 px-4 rounded ml-8' 
          onClick={handleLogout}>
            Logout
          </button>
      </div>
      
    </div>
  )
}

export default Navbar