import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './components/Layout/Navbar.jsx';

function HomeLayout() {
  return (
    <div className='bg-indigo-50 min-h-screen flex flex-col'>

        <Navbar />
        <main className='flex-1 p-6 mt-10'>
          <Outlet />
        </main>
    </div>
  )
}

export default HomeLayout