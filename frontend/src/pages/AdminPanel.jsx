import api from "../api/api.js"
import { checkUser } from "../utils/auth"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import NavBar from "../components/Navbar.jsx"
import { Link } from "react-router-dom"

export default function AdminPanel() {
  const user = checkUser()
  const [users, setUsers] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await api.get("/auth/users")
        setUsers(res.data)
        setLoading(false)
      } catch (error) {
        const message = error.response?.data?.message || "Something went wrong"
        toast.error(message)
      }
    }
    getAllUsers()
  }, [users])

  async function changeRole(email, role) {
    try {
      await api.put("/auth/role", {
        email,
        role
      })
        .then((response) => toast.success(response.data.message));
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong"
      toast.error(message)
    }
  }

  return (
    <div>
      <NavBar />
      <div className="h-screen flex ml-12 mt-18">
        {user &&
          user.role === 'admin' && (
            <div className="flex flex-col gap-8">
              <Link to="/add-place">
                <button className="ml-4 w-fit bg-black text-white px-2 py-2 rounded-xl hover:cursor-pointer hover:bg-gray-800">Add new Place</button>
              </Link>
              <div>
                <button>Users</button>
                {users &&
                  <div className="w-fit">
                    {users.length > 0 &&
                      <table className="table-auto border-separate m-4 w-full">
                        <thead>
                          <tr>
                            <th>Email</th>
                            <th>Role</th>
                          </tr>
                        </thead>
                        {users.map((user) => (
                          < tbody key={user._id} >
                            {user.email !== 'admin@hike.com' &&
                              <tr>
                                <td>{user.email}</td>
                                <td>
                                  <select value={user.role} onChange={(e) => changeRole(user.email, e.target.value)}>
                                    <option value="user">user</option >
                                    <option value="admin">admin</option >
                                  </select >
                                </td>
                              </tr>
                            }
                          </tbody>
                        ))}
                      </table>
                    }
                  </div>
                }
              </div>
            </div>
          )
        }
      </div>
    </div >
  )
}
