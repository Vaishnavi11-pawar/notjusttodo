import React, {useState, useEffect} from 'react'
import {Pencil, CircleCheckBig, Trash2} from "lucide-react";
import axios from 'axios';

function Tasks() {

  const [todos, setTodos] = useState([]);
  const [editText, setEditText] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found");
      return;
    }

    axios.get('/api/v1/get-tasks', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      setTodos(res.data.data);
      console.log("Tasks fetched successfully: ", res.data.data);
    })
    .catch(err => {
      console.log("Error while fetching tasks: ", err);
    })

  }, [])

  const handleDeleteTask = async (taskId) => {
    const token = localStorage.getItem("token");
    if(!token) {
      console.log("token not found.");
      return;
    }
    try {
      await axios.delete(`/api/v1/delete-task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }) 
      setTodos(todos.filter(todo => todo._id !== taskId));
      console.log("Task deleted successfully.");
    } catch (error) {
     console.log("Error deleting the task: ", error);
    }
  }

  const handleMarkCompleted = async (taskId) => {
    const token = localStorage.getItem("token");
    if(!token) {
      console.log("No token found");
      return;
    }
    try {
      await axios.patch(`/api/v1/update-task-status/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setTodos(todos.map(todo => {
        if (todo._id === taskId) {
          return { ...todo, status: 'completed' };
        }
        return todo;
      }));

    } catch (error) {
      console.log("Erro while updating the task status: ", error); 
    }
  }

  const handleUpdateTask = async (taskId) => {
    const token = localStorage.getItem("token");
    if(!token) {
      console.log("No token found");
      return;
    }
    try {
      await axios.patch(`/api/v1/update-task/${taskId}`, {task: editText}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const res = await axios.get('/api/v1/get-tasks', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setTodos(res.data.data);
      setEditTaskId(null);
      setEditText("");

    } catch (error) {
      console.log("Error while updating the task: ", error);
    }
  }

  return (
    
    <>
      <h1 className='text-4xl font-semibold flex flex-row justify-center items-center text-black'>ToDo List</h1>
      <div className='flex flex-col items-center gap-2'>
            {todos?.map(todo => (
                <div key={todo._id} className='flex flex-col bg-white w-full max-w-3xl p-5 shadow-md rounded-2xl mt-10'>
                <div className='flex justify-end gap-2'>
                  <div className='rounded-full hover:bg-gray-100 p-2 bg-white transition shadow'>
                      <button 
                        className=''
                        onClick={() => {setEditTaskId(todo._id); setEditText(todo.task)}}
                      >
                      <Pencil size={18} color='#333'></Pencil>
                      </button>
                  </div>
                  <div className={`shadow rounded-full p-2 hover:bg-green-100 transition ${todo.status === 'completed' ? 'bg-green-100' : 'bg-white'}`}>
                      <button
                        onClick={() => {handleMarkCompleted(todo._id)}}
                        disabled={todo.status === 'completed'}
                      >
                      <CircleCheckBig size={18} color='#16a34a' strokeWidth={3}></CircleCheckBig>
                      </button>
                  </div>
                  <div className='shadow rounded-full p-2 bg-white hover:bg-red-100 transition'>
                      <button
                        onClick={() => {handleDeleteTask(todo._id)}}
                      >
                        <Trash2 size={18} color='#dc2626'></Trash2>
                      </button>
                  </div> 
                </div>
                <div className='flex flex-col gap-1'>
                  {/* <p className='text-2xl font-medium text-gray-800 mb-2'>{todo.task}</p>
                  <p className='text-sm text-gray-500'>{`created_at: ${new Date(todo.createdAt).toLocaleString()}`}</p>
                  <p className='text-sm text-gray-500'>{`deadline: ${new Date(todo.deadline).toLocaleString()}`}</p> */}

                  {
                    editTaskId === todo._id ? (
                      <div className='flex gap-2'>
                        <input 
                          type="text"
                          className='border border-gray-300 rounded-lg p-2 w-full'
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onBlur={() => handleUpdateTask(todo._id)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleUpdateTask(todo._id);
                            }
                          }}
                          placeholder='Edit task'
                        />
                      </div>
                    ) : (
                      <>
                      <p className='text-2xl font-medium text-gray-800 mb-2'>{todo.task}</p>
                      <p className='text-sm text-gray-500'>{`created_at: ${new Date(todo.createdAt).toLocaleString()}`}</p>
                      <p className='text-sm text-gray-500'>{`deadline: ${new Date(todo.deadline).toLocaleString()}`}</p>
                      </>
                    )
                  }
                </div>
              </div>
              ))
            }
      </div>
    </>
  )
}

export default Tasks