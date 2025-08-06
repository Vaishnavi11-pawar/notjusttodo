import React from 'react'
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className='flex items-center justify-center h-screen w-screen bg-indigo-50'>
        <Outlet />
    </div>
  )
}

export default Layout