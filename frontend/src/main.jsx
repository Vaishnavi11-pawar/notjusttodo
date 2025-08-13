import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import LoginForm from './components/Auth/LoginForm.jsx'
import RegisterForm from './components/Auth/RegisterForm.jsx'
import Layout from './Layout.jsx'
import HomeLayout from './HomeLayout.jsx'
import Home from "./components/Home/Home.jsx"
import Tasks from './components/Tasks/Tasks.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='' element={<Layout />}>
        <Route path='login' element={<LoginForm />}/>
        <Route path='register' element={<RegisterForm />}/>
      </Route>
      <Route path='/' element={<HomeLayout />}>
        <Route index element={<Home />}/>
        <Route path='tasks' element={<Tasks />} />
      </Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
