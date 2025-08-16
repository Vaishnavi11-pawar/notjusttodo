import React from 'react'
import Navbar from './components/Layout/Navbar'
import { Outlet } from 'react-router-dom';
 

function TaskLayout() {
  return (
     <div className='bg-gray-100 min-h-screen flex flex-col'>

        <Navbar />
        <main className='flex-1 p-6 mt-10'>
          <Outlet />
        </main>
    </div>
  )
}

export default TaskLayout