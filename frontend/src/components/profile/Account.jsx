import toast from "react-hot-toast"
import { checkUser } from "../../utils/auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Overlay from "../Overlay"
import api from "../../api/api"
import { useForm } from "react-hook-form"

export default function Account() {
  const [user, setUser] = useState(checkUser())
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()

  function logoutUser() {
    localStorage.removeItem("token")
    setUser(null)
    toast.success("Logout successfully")
    navigate('/')
  }

  async function deleteAccount(data) {
    try {
      const res = await api.delete('/auth', {
        data: {
          id: user.id,
          password: data.password
        }
      })
      localStorage.removeItem("token")
      setUser(null)
      toast.success(res.data.message)
      navigate('/')
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong"
      toast.error(message)
    }
  }
  return (
    <>
      <div className="text-white p-4">
        {open && (
          <Overlay isOpen={open} onClose={() => setOpen(false)}>
            <form onSubmit={handleSubmit(deleteAccount)}>
              <div className="flex flex-col gap-4">
                <label>Enter your password</label>
                <input type="password" {...register("password")} placeholder="Password" className="border-2 p-2 bg-gray-500" />
                <div className="flex flex-col gap-4">
                  <h2 className="text-black">Do you really want to delete your account?</h2>
                  <div className="flex justify-end">
                    {/* <button className="bg-black px-2 w-fit hover:cursor-pointer border-2 text-white">No</button> */}
                    <button type="submit" className="bg-red-500 hover:cursor-pointer hover:bg-red-600 px-2 border-4 text-white">Yes</button>
                  </div>
                </div>
              </div>
            </form>
          </Overlay>
        )}
        <h1 className="text-2xl">Hello {user.email.split('@')[0]}</h1>
        <div className="flex gap-4 mt-8 max-sm:flex-col">
          <button onClick={logoutUser} className="text-4 bg-gray-500 py-2 px-4 font-bold rounded-xl hover:cursor-pointer">Logout</button>
          <button onClick={() => setOpen(true)} className="text-4 bg-red-500 py-2 px-4 font-bold rounded-xl hover:cursor-pointer">Delete My Account</button>
        </div>
      </div >
    </>
  )
}
