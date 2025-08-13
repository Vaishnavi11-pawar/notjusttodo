import React from 'react'
import { useState, forwardRef } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {Calendar, X} from "lucide-react"
import axios from "axios";

function Home() {
  const [showInviteDiv ,setShowInviteDiv] = useState(false);
  const [emails, setEmails] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [mainEmails, setmainEmails] = useState("");
  const [task, setTask] = useState("");

  const handleInvite = () => {
    setmainEmails(emails);
    setEmails("")
    setShowInviteDiv(false);
  }

  const handleAddTask = async () => {
    try {
      const payload = {
        task: task,
        deadline: selectedDate ? selectedDate : null,
        collaborators: mainEmails
      }

      await axios.post("/api/v1/add-task", payload);

      setTask("");
      setSelectedDate(null);
      setmainEmails("");

    } catch (error) {
      console.log(error);
    }
  }

  const CustomDateInput = forwardRef(({ onClick }, ref) => (
    <button
      type='button'
      className='p-2 border border-gray-800 rounded-l-lg hover:border-black h-11'
      onClick={onClick}
      ref={ref}
    >
      <Calendar className='text-gray-700' size={20} />
    </button>
  ))

  return (
    <>
      <h1 className='text-4xl font-semibold flex flex-row justify-center items-center text-black'>Welcome to <span className='text-indigo-800 inline ml-3 mr-3'> ToDo </span> List!</h1>      
      <div className='flex w-full max-w-6xl items-center justify-center p-4 mt-20'>
        <div className='w-1/2 flex items-center justify-center p-2 ml-20'>
          <h1 className='text-6xl font-bold'>Want to add Task...</h1>
        </div>


        <div className='w-1/2 flex items-center justify-center p-2 ml-8'>
          <div className='max-w-2xl w-2xl p-8 rounded-2xl shadow-xl ml-60 h-[40vh]'>
            {/* Adding task */}
            <div className='flex items-center mt-4'>
              <input 
                type="text" 
                className='border border-gray-800 p-2 rounded-xl w-96' 
                placeholder='Enter Task' 
                value={task}
                onChange={(e) => setTask(e.target.value)}
                />
            </div>

            {/* set deadline */}
            <div className='flex mt-4'>
              <DatePicker 
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                customInput={<CustomDateInput />}
              />
              <input
                type="text"
                className='border border-gray-800 p-2 rounded-r-xl w-87'
                placeholder='Set Deadline'
                value={selectedDate ? selectedDate.toLocaleDateString("en-GB") : ""}
                readOnly
              />
            </div>

            {/* Invite Collaborators */}
            <div className='flex items-start mt-4'>
              <input type="text" 
                  className='border border-gray-800 p-2 rounded-xl w-96'
                  placeholder='Invite Collaborators'
                  value={mainEmails}
                  readOnly
                  onClick={() => setShowInviteDiv(true)}  
              />
            </div>

            {/* Add task button */}
            <div>
              <button className='bg-indigo-800 rounded-xl text-white py-2 px-4 p-3 w-96 mt-4 hover:bg-indigo-900' onClick={handleAddTask}>Add Task</button>
            </div>

          </div>
        </div>
      </div>

          {showInviteDiv && (
            <div className='fixed inset-0 bg-opacity-40 flex justify-center items-center'>
              <div className='bg-white p-5 rounded-xl shadow-lg w-96'>
                <div className='flex justify-end'>
                    <button className='text-gray-600 hover:text-white hover:bg-red-500'
                    onClick={() => setShowInviteDiv(false)}
                    >
                      <X size={18}/>
                    </button>
                  </div>
                  <h2 className='text-xl font-semibold mb-4'>Invite Collaborators</h2>
                  <div className='flex'>
                    <input 
                      type="text" 
                      placeholder='Email, separated by commas'
                      value={emails}
                      onChange={(e) => setEmails(e.target.value)}
                      className='border border-gray-400 p-2 rounded-l-lg w-full'
                      />
                      <button
                        className='bg-indigo-700 text-white px-4 rounded-r-lg'
                        onClick={handleInvite}
                        >
                          Invite
                      </button>
                  </div>
                  
              </div>
            </div>
          )}

    </>
  )
}

export default Home