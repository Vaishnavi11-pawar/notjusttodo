import React from 'react'
import { useState, forwardRef } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {Calendar, X, ArrowDown, ClipboardList, CalendarDays, Users} from "lucide-react"
import axios from "axios";
import { set } from 'date-fns';

function Home() {
  const [showInviteDiv ,setShowInviteDiv] = useState(false);
  const [emails, setEmails] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [task, setTask] = useState("");
  const [deadLineInput, setDeadLineInput] = useState("");

  const token = localStorage.getItem("token");

  const handleAddTask = async () => {
    try {
      const payload = {
        task: task,
        deadline: selectedDate ? selectedDate : null,
        collaborators: emails
      }

      await axios.post("/api/v1/add-task", payload);

      setTask("");
      setSelectedDate(null);
      // setmainEmails("");
      setEmails("");

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
      {
        token ? (
          <>

          <h1 className='text-6xl font-semibold flex flex-row justify-center items-center black mr-10 mt-10'>Manage Your Tasks...</h1>
          <p className="mt-6 text-5xl font-serif text-gray-600 flex flex-row justify-center items-center mr-10">collaboratively</p>
          <div className='flex flex-row justify-center items-center mt-8 gap-5 mr-8'>
            <button className='bg-white text-indigo-800 font-semibold py-2 px-4 rounded border border-gray-400'>create task</button>
            <button className='bg-white text-indigo-800 font-semibold py-2 px-4 rounded border border-gray-400 ml-1'>set deadlines</button>
            <button className='bg-white text-indigo-800 font-semibold py-2 px-4 rounded border border-gray-400 ml-1'>collaborate with team</button>
          </div>

          <div className="mt-10 text-center">
            <h2 className="text-2xl font-semibold text-neutral-950">
              For professionals who want to stay productive and organized.
            </h2>
            <p className="mt-2 text-xl font-semibold text-neutral-700">
              Manage tasks, deadlines, and collaboration in one simple workspace.
            </p>
            <p className="text-xl mt-2 font-semibold text-neutral-700">
              Work better, together.
            </p>

          </div>

          <div className='flex justify-center items-center mt-20 rounded-full p-2'>
            <button>
              <ArrowDown size={30} className='bg-gray-50 rounded-full p-1 hover:bg-gray-300' />
            </button>
          </div>

          

            <div className='flex w-full items-center justify-center p-4 mt-20'>
              <div className='w-1/2 flex flex-row items-center justify-end p-8 h-[50vh] gap-4'>
                <div className="flex flex-col items-center justify-start gap-8">
                  <button className='bg-white font-semibold py-2 px-2 rounded'>
                    <ClipboardList className="w-5 h-5 text-indigo-800" />
                  </button>
                  <button className='bg-white font-semibold py-2 px-2 rounded'>
                    <CalendarDays className="w-5 h-5 text-indigo-800" />
                  </button>
                  <button className='bg-white font-semibold py-2 px-2 rounded'>
                    <Users className="w-5 h-5 text-indigo-800" />
                  </button>
                </div>

                <div className="flex flex-col justify-start gap-9">
                  <span className="text-lg font-semibold text-gray-700">Create Tasks</span>
                  <span className="text-lg font-semibold text-gray-700">Set Deadlines</span>
                  <span className="text-lg font-semibold text-gray-700">Collaborate with Team</span>
                </div>

              </div>

              <div className='w-1/2 flex items-center justify-start h-[50vh]'>
                <div className='p-8 rounded-2xl shadow-xl bg-white flex flex-col items-start h-[45vh]'>
                  <h1 className='text-xl font-semibold'>Create your Task here...</h1>
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
                      onChange={(date) => {
                        setSelectedDate(date);
                        setDeadLineInput(date ? date.toLocaleDateString("en-GB") : "");
                      }}
                      dateFormat="dd/MM/yyyy"
                      customInput={<CustomDateInput />}
                    />
                    <input
                      type="text"
                      className='border border-gray-800 p-2 rounded-r-xl w-87'
                      placeholder='Set Deadline (dd/mm/yyyy)'
                      value={deadLineInput}
                      onChange={(e) => {
                        const value = e.target.value;
                        setDeadLineInput(value);
                        const parts = value.split('/');
                        if (parts.length === 3) {
                          const day = parseInt(parts[0], 10);
                          const month = parseInt(parts[1], 10)-1;
                          const year = parseInt(parts[2], 10);
                          const newDate = new Date(year, month, day) 

                          if (!isNaN(newDate.getTime())) {
                            setSelectedDate(newDate);
                          }
                        } else if (value.trim() === "") {
                            setSelectedDate(null);
                          }
                      }}
                    />
                  </div>

                  {/* Invite Collaborators */}
                  <div className='flex items-start mt-4'>
                    <input type="text" 
                        className='border border-gray-800 p-2 rounded-xl w-96'
                        placeholder={showInviteDiv ? "Enter emails, separated by commas" : "Invite Collaborators"}
                        value={emails}
                        readOnly={!showInviteDiv}
                        onClick={() => {setShowInviteDiv(true)}}
                        onChange={(e) => setEmails(e.target.value)}
                    />
                  </div>

                  {/* Add task button */}
                  <div>
                    <button className='bg-indigo-800 rounded-xl text-white py-2 px-4 p-3 w-96 mt-4 hover:bg-indigo-900' onClick={handleAddTask}>Add Task</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
          <h1 className='text-6xl font-semibold flex flex-row justify-center items-center black mr-10 mt-10'>Manage Your Tasks...</h1>
          <p className="mt-6 text-5xl font-serif text-gray-600 flex flex-row justify-center items-center mr-10">collaboratively</p>
          <div className='flex flex-row justify-center items-center mt-8 gap-5 mr-8'>
            <button className='bg-white text-indigo-800 font-semibold py-2 px-4 rounded border border-gray-400'>create task</button>
            <button className='bg-white text-indigo-800 font-semibold py-2 px-4 rounded border border-gray-400 ml-1'>set deadlines</button>
            <button className='bg-white text-indigo-800 font-semibold py-2 px-4 rounded border border-gray-400 ml-1'>collaborate with team</button>
          </div>

          <div className="mt-10 text-center">
            <h2 className="text-2xl font-semibold text-neutral-950">
              For professionals who want to stay productive and organized.
            </h2>
            <p className="mt-2 text-xl font-semibold text-neutral-700">
              Manage tasks, deadlines, and collaboration in one simple workspace.
            </p>
            <p className="text-xl mt-2 font-semibold text-neutral-700">
              Work better, together.
            </p>

          </div>

          <div className='flex justify-center items-center mt-20 rounded-full p-2'>
            <button>
              <ArrowDown size={30} className='bg-gray-50 rounded-full p-1 hover:bg-gray-300' />
            </button>
          </div>

          

            <div className='flex w-full items-center justify-center p-4 mt-20'>
              <div className='w-1/2 flex flex-row items-center justify-end p-8 h-[50vh] gap-4'>
                <div className="flex flex-col items-center justify-start gap-8">
                  <button className='bg-white font-semibold py-2 px-2 rounded'>
                    <ClipboardList className="w-5 h-5 text-indigo-800" />
                  </button>
                  <button className='bg-white font-semibold py-2 px-2 rounded'>
                    <CalendarDays className="w-5 h-5 text-indigo-800" />
                  </button>
                  <button className='bg-white font-semibold py-2 px-2 rounded'>
                    <Users className="w-5 h-5 text-indigo-800" />
                  </button>
                </div>

                <div className="flex flex-col justify-start gap-9">
                  <span className="text-lg font-semibold text-gray-700">Create Tasks</span>
                  <span className="text-lg font-semibold text-gray-700">Set Deadlines</span>
                  <span className="text-lg font-semibold text-gray-700">Collaborate with Team</span>
                </div>

              </div>

              <div className='w-1/2 flex items-center justify-start h-[50vh]'>
                <div className='p-8 rounded-2xl shadow-xl bg-white flex flex-col items-start h-[45vh]'>
                  <h1 className='text-xl font-semibold'>Create your Task here...</h1>
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
                      onChange={(date) => {
                        setSelectedDate(date);
                        setDeadLineInput(date ? date.toLocaleDateString("en-GB") : "");
                      }}
                      dateFormat="dd/MM/yyyy"
                      customInput={<CustomDateInput />}
                    />
                    <input
                      type="text"
                      className='border border-gray-800 p-2 rounded-r-xl w-87'
                      placeholder='Set Deadline (dd/mm/yyyy)'
                      value={deadLineInput}
                      onChange={(e) => {
                        const value = e.target.value;
                        setDeadLineInput(value);
                        const parts = value.split('/');
                        if (parts.length === 3) {
                          const day = parseInt(parts[0], 10);
                          const month = parseInt(parts[1], 10)-1;
                          const year = parseInt(parts[2], 10);
                          const newDate = new Date(year, month, day) 

                          if (!isNaN(newDate.getTime())) {
                            setSelectedDate(newDate);
                          }
                        } else if (value.trim() === "") {
                            setSelectedDate(null);
                          }
                      }}
                    />
                  </div>

                  {/* Invite Collaborators */}
                  <div className='flex items-start mt-4'>
                    <input type="text" 
                        className='border border-gray-800 p-2 rounded-xl w-96'
                        placeholder={showInviteDiv ? "Enter emails, separated by commas" : "Invite Collaborators"}
                        value={emails}
                        readOnly={!showInviteDiv}
                        onClick={() => {setShowInviteDiv(true)}}
                        onChange={(e) => setEmails(e.target.value)}
                    />
                  </div>

                  {/* Add task button */}
                  <div>
                    <button className='bg-indigo-800 rounded-xl text-white py-2 px-4 p-3 w-96 mt-4 hover:bg-indigo-900' onClick={handleAddTask}> Login to Add Task</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      }
    </>
  )
}

export default Home;