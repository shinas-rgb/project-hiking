import { useEffect, useState } from "react"
import { checkUser } from "../utils/auth"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import api from "../api/api.js"
import { Link } from "react-router-dom"
import Navbar from "./Navbar.jsx"

export default function UserProfile() {
  const user = checkUser()
  const [pass, setPass] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  async function onSubmit(data) {
    try {
      await api.put("/auth/profile", {
        email: user.email,
        oldPass: data.oldPass,
        newPass: data.newPass
      })
        .then((response) => toast.success(response.data.message))
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong"
      toast.error(message)
    }
  }

  return (
    <div>
      <Navbar/>
      <div>
        <h1>Hello {user.email.split('@')[0]}</h1>
        <button className="bg-gray-300 rounded-xl py-1 px-3" onClick={() => setPass(!pass)}>Change Password</button>
        {pass && (
          <div className="mt-4">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
              <input className="bg-gray-300 w-fit p-2 focus:bg-gray-400 rounded-xs"
                type="text"
                placeholder="Old password"
                {...register("oldPass", { required: "Old password is required" })} />
              <input className="bg-gray-300 w-fit p-2 focus:bg-gray-400 rounded-xs"
                type="text"
                placeholder="New password"
                {...register("newPass", { required: "New password is required" })} />
              <button className="bg-blue-300 rounded-xl py-1 px-3 w-fit" type="submit">Submit</button>
            </form>
          </div>
        )}
      </div>
      {user.role === 'admin' && (
        <div className="mt-12">
          <Link to="/admin">
            <button className="ml-4 w-fit bg-black text-white px-2 py-2 rounded-xl hover:cursor-pointer hover:bg-gray-800">Admin Panel</button>
          </Link>
        </div>
      )}
    </div >
  )
}
