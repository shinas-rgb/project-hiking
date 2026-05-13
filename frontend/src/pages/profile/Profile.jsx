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
