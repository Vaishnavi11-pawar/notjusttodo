import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './components/Layout/Navbar.jsx';
import Footer from './components/Layout/Footer.jsx';

function HomeLayout() {
  return (
    <div className='bg-gray-100 min-h-screen flex flex-col'>

        <Navbar />
        <main className='flex-1 p-6 mt-10'>
          <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default HomeLayout