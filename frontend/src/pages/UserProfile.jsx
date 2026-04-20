import { NavLink, Outlet } from "react-router-dom"
import Navbar from "../components/Navbar.jsx"

export default function UserProfile() {

  return (
    <div>
      <Navbar />
      <div className="flex text-white h-screen mt-4">

        {/* SideBar */}
        <div className="w-76 bg-gray-600 max-sm:w-24 max-sm:text-center flex flex-col border-2 border-gray-300 hover:cursor-default">
          <NavLink className="bg-gray-700 py-2 p-2 text-gray-300 border-b-3 p-2 border-gray-700 hover:bg-gray-500" to="" >Menu</NavLink>
          <NavLink to="Account" className="border-b-3 p-2 border-gray-700 hover:bg-gray-500" >Account</NavLink>
          <NavLink to="reviews" className="border-b-3 p-2 border-gray-700 hover:bg-gray-500">Reviews</NavLink>
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
    </div >
  )
}
