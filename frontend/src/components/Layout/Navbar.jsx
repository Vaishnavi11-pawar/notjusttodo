import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import logopng from "../../assets/Todologo.png";
import axios from 'axios';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
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
      console.log("logout failed error: ", error);
    }
  }

  const activeClass = 'text-indigo-800 font-semibold border-b-2 border-indigo-800'
  const inactiveClass = 'text-black font-semibold hover:text-indigo-800'

  return (
    <div className='flex justify-around items-center p-6 shadow text-white h-16 bg-gray-50'>
      <div>
        <h1 className='text-4xl font-bold text-indigo-800'>ToDo</h1>
      </div>
      <div className='flex items-center gap-8'>
        <NavLink
          to="/"
          className={({isActive}) => isActive ? activeClass: inactiveClass}
        >
          Home
        </NavLink>
        <NavLink
          to="/tasks"
          className={({isActive}) => isActive ? activeClass : inactiveClass}
        >
          My Tasks
        </NavLink>
       
        
        {token ? (
          <button
            className='bg-white border-2 border-gray-400 text-indigo-700 hover:border-indigo-700 hover:shadow-cyan-50 font-semibold py-2 px-4 rounded ml-8'
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <button
            className='bg-indigo-600 text-white font-semibold py-2 px-4 rounded ml-8'
            onClick={() => navigate('/login')}
          >
            Login
          </button>

        )}
      </div>
      
    </div>
  )
}

export default Navbar