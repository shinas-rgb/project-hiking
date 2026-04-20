import NavBar from "../components/Navbar.jsx"
import { NavLink, Outlet } from "react-router-dom"

export default function AdminPanel() {
  return (
    <div className="">
      <NavBar />
      <div className="flex gap-4">
        <div className="bg-gray-600 text-white border w-70 h-screen flex flex-col">
          <NavLink className="border p-2 bg-gray-700 hover:bg-gray-500" to="" >Main</NavLink>
        </div>
        <div className="flex-1 p-1">
          <Outlet />
        </div>
      </div>
    </div >
  )
}
