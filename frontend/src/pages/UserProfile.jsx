import { NavLink, Outlet } from "react-router-dom"
import Navbar from "../components/Navbar.jsx"
import { useState } from "react"

export default function UserProfile() {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <Navbar />
      <div className="flex text-white h-screen mt-4 max-sm:flex-col">

        {/* SideBar */}
        <div className="w-76 bg-gray-600 max-sm:hidden flex flex-col border-2 border-gray-300 hover:cursor-default">
          <NavLink className="bg-gray-700 py-2 p-2 text-gray-300 border-b-3 p-2 border-gray-700 hover:bg-gray-500" to="" >Menu</NavLink>
          <NavLink to="Account" className="border-b-3 p-2 border-gray-700 hover:bg-gray-500" >Account</NavLink>
          <NavLink to="reviews" className="border-b-3 p-2 border-gray-700 hover:bg-gray-500">Reviews</NavLink>
        </div>
        <div className="sm:hidden">
          <svg className="fill-white h-8" onClick={() => setOpen(!open)}
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z" /></svg>
          {open && (
            <div className="bg-gray-600 text-white border w-full h-fit flex mt-2 justify-center">
              <NavLink className="border p-2 px-4 bg-gray-700 w-full hover:bg-gray-500" to="" >Menu</NavLink>
              <NavLink to="Account" className="bg-gray-700 py-2 w-full text-gray-300 border-b-3 p-2 border-gray-700 hover:bg-gray-500" >Account</NavLink>
              <NavLink to="reviews" className="border p-2 px-4 w-full bg-gray-700 hover:bg-gray-500">Reviews</NavLink>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
    </div >
  )
}
