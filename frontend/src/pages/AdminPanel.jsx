import { useState } from "react"
import NavBar from "../components/Navbar.jsx"
import { NavLink, Outlet } from "react-router-dom"

export default function AdminPanel() {
  const [open, setOpen] = useState(false)
  return (
    <div className="">
      <NavBar />
      <div className="flex sm:gap-4 max-sm:flex-col">
        <div className="bg-gray-600 text-white border w-70 h-screen flex flex-col max-sm:hidden">
          <NavLink className="border p-2 bg-gray-700 hover:bg-gray-500" to="" >Main</NavLink>
        </div>
        <div className="sm:hidden">
          <svg className="fill-white h-8" onClick={() => setOpen(!open)}
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z" /></svg>
          {open && (
            <div className="bg-gray-600 text-white border w-full h-fit flex mt-2 justify-center">
              <NavLink className="border p-2 px-4 bg-gray-700 w-full text-center hover:bg-gray-500" to="" >Main</NavLink>
            </div>
          )}
        </div>
        <div className="flex-1 p-1">
          <Outlet />
        </div>
      </div>
    </div >
  )
}
