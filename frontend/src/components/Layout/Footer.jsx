import React from 'react'
import {Mail} from "lucide-react"

function Footer() {
  return (
    <footer className="bg-white mt-10">
      <div className="flex flex-row justify-center ml-20 h-[40vh] p-15">
    
        <div className='ml-7'>
          <h1 className="text-2xl font-bold text-indigo-800">NotJustToDo</h1>
          <h1 className="mt-3 text-lg text-black flex flex-col gap-2">
            <span>Stay organized</span>
            <span>set deadlines</span>
            <span>and </span>
            <span>collaborate effortlessly with your team...</span>
          </h1>
        </div>

        <div className='flex flex-col '>
          <h2 className="text-lg font-semibold text-black mb-3">Links</h2>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-gray-600">Home</a></li>
            <li><a href="/tasks" className="hover:text-gray-600">My Tasks</a></li>
          </ul>
        </div>

        <div className='ml-13 flex flex-col'>
          <h2 className="text-lg font-semibold text-black mb-3">Get in Touch</h2>
          <p className="text-sm text-gray-700 mt-1">Email us at:</p>
          <p className="flex items-center gap-2 mt-1">
            <Mail size={18} /> <span>vaishnavi.22211188@viit.ac.in</span>
          </p>

        </div>
      </div>

      <div className="border-t border-gray-200 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} NotJustToDo. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer