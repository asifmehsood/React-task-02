import React from 'react'
import { Link } from 'react-router-dom'
export default function Home(props) {
  return (
      <>
      <div className="flex gap-10 justify-center items-center h-[90vh]">
       <img width={200} src="src\assets\anydo.png" alt="logo"/>
       <div className="flex gap-10 justify-center items-center flex-col">
       <span className="text-violet-500 text-lg font-bold italic underline decoration-violet-500">itask - always remember your todos</span>
       <Link to="/list"><button  className="mx-3 shadow-lg shadow-gray-500 bg-slate-900 px-2 py-1 rounded-lg text-sm text-red-600 cursor-pointer hover:text-lg transition-all w-40 h-10">Get started</button></Link>
       </div>
      </div>
     </>
  )
}
