import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import api from "../../api/api.js"
import { Link } from "react-router-dom"

export default function Admin() {
  const [users, setUsers] = useState({})
  const [places, setPlaces] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, placeRes] = await Promise.all([
          api.get('/auth/users'),
          api.get('/place')
        ])
        setUsers(userRes.data)
        setPlaces(placeRes.data)
        setLoading(false)
      } catch (error) {
        const message = error.response?.data?.message || "Something went wrong"
        toast.error(message)
      }
    }
    fetchData()
  }, [])
  return (
    <>
      <div className="ml-4">
        {!loading && (
          <div className="flex gap-4 max-sm:flex-col">
            <div>
              <h1>Users</h1>
              <table className="table-auto text-left text-body">
                <thead className=" border-b bg-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-3">User</th>
                    <th scope="col" className="px-6 py-3">Profile</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 && users.map((user) => (
                    <tr key={user._id} className="odd:bg-neutral-300 even:bg-neutral-400 border-b">
                      <td className="py-4 px-2">{user.email}</td>
                      <td className="px-2 "><Link className="text-blue-800 underline hover:text-blue-600" to={`users/${user._id}`}>Link</Link></td>
                    </tr >
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <h1>Places</h1>
              <div>
                <table className="table-auto text-left text-body">
                  <thead className=" border-b bg-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-3">Place</th>
                      <th scope="col" className="px-6 py-3">Page</th>
                    </tr>
                  </thead>
                  <tbody>
                    {places.length > 0 && places.map((place) => (
                      <tr key={place._id} className="odd:bg-neutral-300 even:bg-neutral-400 border-b">
                        <td className="py-4 px-2">{place.title}</td>
                        <td className="px-2 "><Link className="text-blue-800 underline hover:text-blue-600" to={`place/${place._id}`}>Link</Link></td>
                      </tr >
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div >
    </>
  )
}
