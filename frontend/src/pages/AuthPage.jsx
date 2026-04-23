import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { checkUser } from "../utils/auth.js"
import api from "../api/api.js"

export default function AuthPage() {
  const { register, handleSubmit } = useForm()
  const [mode, setMode] = useState("login")
  const navigate = useNavigate()
  const user = checkUser()


  async function onSubmit(data) {
    try {
      if (mode !== 'login') {
        await api.post("/auth/signup", {
          email: data.email,
          password: data.password,
        })
          .then((response) => toast.success(response.data.message))
      }

      await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      })
        .then((response) => {
          toast.success(response.data.message)
          localStorage.setItem("token", response.data.token)
        });

      localStorage.setItem("user", data.email)
      navigate('/')
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong"
      localStorage.removeItem("token")
      toast.error(message)
    }
  }
  return (
    <div className="grid justify-center content-center w-full h-screen">
      <div className="auth-container flex flex-col text-center gap-2">
        {mode === 'login' ? (
          <h1>Login</h1>
        ) : (
          <h1>SignUp</h1>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}

          className="new-form align-text-top sm:gap-2">
          <input
            className="input-field max-sm:mb-2"
            type="email"
            placeholder="name@domain.com"
            {...register('email', { required: 'Email is Required' })} />
          <input
            className="input-field max-sm:mb-2"
            type="password"
            placeholder="password"
            {...register('password', { required: 'Password is required' })} />
          <button className="bg-blue-500 h-8 max-sm:mb-2 rounded-xl hover:cursor-pointer hover:bg-blue-600 text-white" type="submit">
            {mode === 'login' ? (
              'Login'
            ) : (
              'SignUp'
            )}
          </button>
          {mode === 'login' ? (
            <p className="text-xs text-white">Don't have an account? <a onClick={() => setMode('signup')}
              className="text-purple-600 hover:cursor-pointer hover:text-purple-900 hover:underline">
              SignUp</a></p>
          ) : (
            <p className="text-xs text-white">Already have an account? <a onClick={() => setMode('login')}
              className="text-purple-600 hover:cursor-pointer hover:text-purple-900 hover:underline">
              Login</a></p>
          )}
        </form>
        {user &&
          user.role === 'admin' && <p>Admin panel</p>}
      </div>
    </div >
  )
}
