import { Link } from "react-router-dom";
import { checkUser } from "../utils/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import SearchBar from "../components/SearchBar.jsx"

export default function Navbar() {
  const [user, setUser] = useState(checkUser())

  function logoutUser() {
    localStorage.removeItem("token")
    setUser(null)
    toast.success("Logout successfully")
  }


  return (
    <div>
      <div className='hero mt-4'>
        <div className="flex justify-between mx-8">
          <Link to="/">
            <h1 className='text-xl'>TREK WIKI</h1>
          </Link>
          {user &&
            user.email ? (
            <div className="flex gap-8">
              <button className="text-x mb-8 hover:cursor-pointer text-white" onClick={logoutUser}>Logout</button>
              <Link to="/profile">
                <button className="hover:cursor-pointer text-white">{user.email.split('@')[0]}
                </button>
              </Link>
            </div>
          ) : (
            <Link to="/auth">
              <button className="bg-green-400 py-2 px-4 rounded-xl text-white hover:cursor-pointer">Login</button>
            </Link>
          )}
        </div>
      </div>
      <SearchBar />

    </div >
  )
}
