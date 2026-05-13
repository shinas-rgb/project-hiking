import toast from "react-hot-toast"
import { checkUser } from "../../utils/auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Overlay from "../../components/Overlay"
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

  async function deleteAccount() {
    toast.error("Under Maintenance")
  }
  return (
    <>
      <div className="text-white">
        <div className=" flex my-4">
          <button onClick={() => navigate(-1)}>
            <svg
              className="fill-white h-8"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7C291.2 490.2 291.2 469.9 278.7 457.4L173.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L173.3 288L278.7 182.6C291.2 170.1 291.2 149.8 278.7 137.3C266.2 124.8 245.9 124.8 233.4 137.3L73.4 297.3z" /></svg>
          </button>
          <h2 className="text-center w-full mr-8 canva-bold text-white text-2xl">Account</h2>
        </div>
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
        <div className="flex gap-4 mt-8 max-sm:flex-col">
          <button onClick={logoutUser} className="text-4 bg-gray-500 py-2 px-4 font-bold rounded-xl hover:cursor-pointer">Logout</button>
          <button onClick={() => setOpen(true)} className="text-4 bg-red-500 py-2 px-4 font-bold rounded-xl hover:cursor-pointer">Delete My Account</button>
        </div>
      </div >
    </>
  )
}
