import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import api from "../../api/api.js"
import { Link } from "react-router-dom"

export default function Admin() {
  const [users, setUsers] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/auth/users')
        setUsers(res.data)
        setLoading(false)
      } catch (error) {
        const message = error.response?.data?.message || "Something went wrong"
        toast.error(message)
      }
    }
    fetchUsers()
  }, [])
  return (
    <>
      <div>
        <h1>Users</h1>
        {!loading && (
          <div>
            <table className="table-auto text-left text-body">
              <thead className=" border-b bg-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-3">User</th>
                  <th scope="col" className="px-6 py-3">Profile</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 && users.map((user) => (
                  <tr key={user.id} className="odd:bg-neutral-300 even:bg-neutral-400 border-b">
                    <td className="py-4 px-2">{user.email}</td>
                    <td className="px-2 "><Link className="text-blue-800 underline hover:text-blue-600" to={`users/${user._id}`}>Link</Link></td>
                  </tr >
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div >
    </>
  )
}
