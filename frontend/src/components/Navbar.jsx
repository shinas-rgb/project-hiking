import { Link } from "react-router-dom";
import { checkUser } from "../utils/auth";

export default function Navbar() {
  const user = checkUser()


  return (
    <div>
      <div className='hero mt-4 max-sm:text-xs'>
        <div className="flex justify-between mx-8 ">
          <Link to="/">
            <h1 className='text-xl'>TREK WIKI</h1>
          </Link>
          {user ? (
            <div className="flex gap-8 py-2">
              <Link to="/profile">
                <button className="hover:cursor-pointer text-white">Profile
                </button>
              </Link>
            </div>
          ) : (
            <Link to="/auth" className="mb-4">
              <button className=" py-2 px-4 rounded-xl text-white hover:cursor-pointer">Login</button>
            </Link>
          )}
        </div>
      </div>
    </div >
  )
}
