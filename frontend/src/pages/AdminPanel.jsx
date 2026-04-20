import api from "../api/api.js"
import { checkUser } from "../utils/auth"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import NavBar from "../components/Navbar.jsx"

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
  }, [loading])

  // async function changeRole(email, role) {
  //   try {
  //     await api.put("/auth/role", {
  //       email,
  //       role
  //     })
  //       .then((response) => toast.success(response.data.message));
  //     setLoading(true)
  //   } catch (error) {
  //     const message = error.response?.data?.message || "Something went wrong"
  //     toast.error(message)
  //   }
  // }

  return (
    <div className="">
      <NavBar />
      <div className="flex ml-12 mt-18">
        {user &&
          user.role === 'admin' && (
            <div className="flex flex-col gap-8">
              <div>
                <h1>Manage Users</h1>
                {users &&
                  <div className="w-fit text-white flex flex-col border-collapse border-2 p-2 mt-2 gap-8">
                    {users.length > 0 &&
                      <>
                        <table>
                          <thead>
                            <th>Email</th>
                          </thead>
                          <tbody>
                            {
                              users.map((user) => (
                                <>
                                  {user.email !== 'admin@hike.com' && (
                                    <h2>
                                      {user.email}
                                    </h2 >
                                  )}
                                </>
                              ))
                            }
                          </tbody>
                        </table>
                      </>
                    }
                  </div>
                }
              </div>
            </div >
          )
        }
      </div >
    </div >
  )
}
