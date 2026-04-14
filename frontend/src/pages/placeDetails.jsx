import { useEffect, useState } from "react"
import api from "../api/api.js"
import { useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast"
import { checkUser } from "../utils/auth.js"
import { useForm } from "react-hook-form"
import Navbar from "../components/Navbar.jsx"

export default function PlaceDetails() {
  const user = checkUser()
  const { id } = useParams()
  const [place, setPlace] = useState({})
  const [loading, setLoading] = useState(true)
  const [edit, setEdit] = useState(false)
  const [title, setTitle] = useState("")
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const res = await api.get(`/place/${id}`)
          .then((response) => setPlace(() => response.data))
        setLoading(false)
        setTitle(place.title)
      } catch (error) {
        const message = error.response?.data?.message || "Something went wrong"
        toast.error(message)
      }
    }
    fetchPlace()
  }, [])

  const deletePlace = async () => {
    try {
      await api.delete(`/place/${id}`)
        .then((response) => toast.success(response.data.message))
      navigate('/')
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong"
      toast.error(message)
    }
  }

  const onSubmit = async (data) => {
    try {
      await api.put(`/place/${id}`, {
        title: data.name || place.title,
        content: data.content || place.content,
        link: data.link || place.link
      })
        .then((response) => toast.success(response.data.message))
      setLoading(false)
      window.location.reload()
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong"
      toast.error(message)
    }
  }
  return (
    <div>
      <Navbar />
      <div className="h-screen flex justify-center items-center">
        <div className="flex justify-evenly w-full items-center">
          {loading ? 'Loading...'
            : (
              < div className="bg-rose-500 w-fit p-8 flex flex-col gap-8 rounded-2xl">
                <div className="flex justify-between">
                  <h1 className="text-2xl">{place && `${place.title}`}</h1>
                  {user.role === 'admin' &&
                    <button onClick={() => setEdit(!edit)}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"
                        className="w-8"><path d="M416.9 85.2L372 130.1L509.9 268L554.8 223.1C568.4 209.6 576 191.2 576 172C576 152.8 568.4 134.4 554.8 120.9L519.1 85.2C505.6 71.6 487.2 64 468 64C448.8 64 430.4 71.6 416.9 85.2zM338.1 164L122.9 379.1C112.2 389.8 104.4 403.2 100.3 417.8L64.9 545.6C62.6 553.9 64.9 562.9 71.1 569C77.3 575.1 86.2 577.5 94.5 575.2L222.3 539.7C236.9 535.6 250.2 527.9 261 517.1L476 301.9L338.1 164z" /></svg>
                    </button>
                  }
                </div>
                <div className="flex gap-18">
                  <p>{place.content}</p>
                  <img className="place-image" src={place.link} alt="" />
                </div>
                {user.role === 'admin' && (
                  <button className=" bg-white w-fit px-3 py-2 rounded-2xl text-red-600" onClick={deletePlace}>DELETE</button>
                )}
              </div>
            )}
          {edit && (
            <div className="bg-blue-400 h-fit p-8 rounded-2xl">
              <form onSubmit={handleSubmit(onSubmit)} className="new-form align-text-top">
                <input
                  className="input-field"
                  type="text"
                  placeholder="Name of place"
                  onChange={(e) => setTitle(e.target.value)}
                  {...register('name')} />
                <textarea
                  className="input-field h-30"
                  type="text"
                  placeholder="Content"
                  {...register('content')} />
                <input
                  className="input-field"
                  type="link"
                  placeholder="link of image"
                  {...register('link')} />
                <button className="bg-blue-500 h-8 rounded-xl hover:cursor-pointer hover:bg-blue-600 text-white" type="submit">Submit</button>
              </form>
            </div>
          )}
        </div>
      </div >
    </div>
  )
}
