import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import api from "../api/api.js"
import img from "../assets/pexels-nepal-visuals-2154640351-33330007.jpg"
import Loader from "../components/Loader.jsx"

export default function AuthPage() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [mode, setMode] = useState("login")
  const navigate = useNavigate()
  const [load, setLoad] = useState(false)


  async function onSubmit(data) {
    try {
      setLoad(true)
      if (mode === 'signup') {
        const res = await api.post("/users/signup", {
          name: data.name,
          email: data.email,
          password: data.password,
        })
        toast.success(res.data.message)
        setMode('login')
      } else if (mode === 'login') {
        const res = await api.post("/users/login", {
          email: data.email,
          password: data.password,
        })
        localStorage.setItem("token", res.data.data.token)
        toast.success(res.data.message)
        navigate('/')
      }
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong"
      localStorage.removeItem("token")
      console.log(message)
      toast.error(message)
    } finally {
      setLoad(false)
    }
  }

  function handleLoad() {
    if (load) return <Loader />
    if (mode === 'login') return 'login'
    if (mode === 'signup') return 'signup'
  }
  return (
    <div className="h-screen sm:mx-20 border-l border-r border-zinc-700">
      <h1 className="absolute sm:top-6 top-3 max-sm:hidden left-3 sm:left-28 text-2xl font-extrabold">Trek wiki</h1>
      <div className="grid sm:grid-cols-2 grid-cols-1 h-screen sm:bg-zinc-800">
        <img className=" w-full h-full max-sm:hidden object-cover overflow-hidden object-center bg-cover rounded-r-2xl" src={img} alt="" />
        <div className="sm:px-28 px-8 flex flex-col justify-center h-screen max-sm:bg-zinc-800">
          <div className="sm:mb-8 mb-4">
            <h1 className="sm:text-5xl text-4xl sm:leading-14 sm:mb-2 mb-2">
              {mode === "login" ? (
                'Login to your account '
              ) : (
                'Create an account '
              )}
            </h1>
          </div>
          <form className="flex flex-col gap-4 text-zinc-300 my-4"
            onSubmit={handleSubmit(onSubmit)}>
            {mode === 'signup' && (
              <div>
                <input
                  className="w-full bg-zinc-700 px-3.5 py-2.5 rounded-md focus:bg-zinc-600"
                  {...register("name", { required: "Name is required" })}
                  type="text" placeholder="Your name" />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                )}
              </div>
            )}
            <div>
              <input
                className="w-full bg-zinc-700 px-3.5 py-2.5 rounded-md focus:bg-zinc-600"
                {...register("email", { required: "Email is required" })}
                type="email" placeholder="Email address" />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <input
                className="w-full bg-zinc-700 px-3.5 py-2.5 rounded-md focus:bg-zinc-600"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 4,
                    message: "Password should be atleast 4 characters"
                  }
                })}
                type="password" placeholder="Password" />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>
            {mode === 'login' && (
              <div>
                <input className="mr-1.5" type="checkbox" defaultChecked />
                <label>Remember me</label>
              </div>
            )}
            <button
              className="bg-zinc-300 mt-2 text-zinc-700 py-2 rounded-md flex justify-center
                hover:cursor-pointer hover:bg-zinc-400 hover:text-zinc-800"
              type="submit">
              {handleLoad()}
            </button>
          </form>
          {mode === 'login' ? (
            <p className="text-zinc-300 text-center">Don't have an account ? <a className="text-blue-500 hover:underline hover:cursor-pointer"
              onClick={() => setMode("signup")}
            >Sign Up
            </a> </p>
          ) : (
            <p className="text-zinc-300 text-center">Already have an account ? <a className="text-blue-500 hover:underline hover:cursor-pointer"
              onClick={() => setMode("login")}
            >Login
            </a> </p>
          )}
        </div>
      </div>
    </div>
  )
}
