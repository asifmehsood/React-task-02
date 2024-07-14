import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Todos from './components/Todos'
import Home from './components/Home'
const App = () => {
  let router = createBrowserRouter([
    {
      path:'/',
      element:<><Login/></>
   },
    {
       path:'/register',
       element:<><Register/></>
    },
    {
      path:'/home',
      element:
      <>
       <Navbar/> 
       <Home/>
       </>  
   },
   {
    path:'/list',
    element:<> <Navbar/> <Todos/></>
 },

])
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App