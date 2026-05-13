import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading.jsx"
import Navbar from "../../components/Navbar";
import api from "../../api/api";

export default function Profile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/users`)
        setUser(res.data.data.user)
        console.log(res.data.data.user)
      } catch (error) {
        const message = error.response?.data?.message || "Something went wrong"
        console.error(message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <Loading />
    )
  }
  return (
    <>
      <div className="h-screen">
        <Navbar />
        {/* <div className=" flex"> */}
        {/*   <button onClick={() => navigate(-1)}> */}
        {/*     <svg */}
        {/*       className="fill-white h-8" */}
        {/*       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7C291.2 490.2 291.2 469.9 278.7 457.4L173.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L173.3 288L278.7 182.6C291.2 170.1 291.2 149.8 278.7 137.3C266.2 124.8 245.9 124.8 233.4 137.3L73.4 297.3z" /></svg> */}
        {/*   </button> */}
        {/*   <h2 className="text-center w-full mr-8 canva-bold text-white text-2xl">Profile</h2> */}
        {/* </div> */}
        <div className="text-zinc-400 bg-zinc-800 rounded-2xl border border-zinc-700 p-4 flex flex-col gap-1">
          {user.name && (
            <h1>{user.name}</h1>
          )}
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
        <div>
          <div className="mt-4 flex flex-col gap-2">
            <button className="bg-gray-500 py-2 px-3 rounded hover:bg-gray-600">
              <Link to="account">
                Account
              </Link>
            </button>

            <button className="bg-gray-500 py-2 px-3 rounded hover:bg-gray-600">
              <Link to="reviews">
                Reviews
              </Link>
            </button>

            <button className="bg-gray-500 py-2 px-3 rounded hover:bg-gray-600">
              <Link to={`/search?bookmarks=true`} >
                Bookmarks
              </Link>
            </button>
          </div>
        </div>
      </div >
    </>
  )
}
