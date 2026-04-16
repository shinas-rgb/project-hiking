import { Link } from "react-router-dom";
import { checkUser } from "../utils/auth";
import { useState } from "react";
import toast from "react-hot-toast";

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
            <h2 className="rounded-xl hover:cursor-pointer">Home</h2>
          </Link>
          <h1 className='hero-title text-4xl'>Kerala Hike & Truk</h1>
          {user &&
            user.email ? (
            <div className="flex gap-8">
              <button className="text-x mb-8 hover:cursor-pointer" onClick={logoutUser}>Logout</button>
              <Link to="/profile">
                <button className="hover:cursor-pointer">{user.email.split('@')[0]}
                </button>
              </Link>
            </div>
          ) : (
            <Link to="/auth">
              <button className="bg-green-400 py-2 px-4 rounded-xl text-white hover:cursor-pointer">Login</button>
            </Link>
          )}
        </div>
        <p className='hero-para'>Descover Kerala's hidden and adventurous trucking spots</p>
      </div>

    </div>
  )
}
