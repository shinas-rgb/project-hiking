import { useEffect, useState } from "react"
import api from "../api/api.js"
import { Link, useNavigate, useParams } from "react-router-dom"
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
  }, [place])

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
      setEdit(false)
      setLoading(false)
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong"
      toast.error(message)
    }
  }
  return (
    <div>
      <Navbar />
      {loading ? 'Loading...'
        : (
          <div className="m-8 text-white">
            <div className="h-fit py-4">
              <div className="flex flex-col gap-8 max-sm:gap-2">
                <h1 className="text-4xl max-sm:text-2xl">{place.title}</h1>
                <div className="flex gap-4 w-full max-sm:flex-col">
                  <p className="w-3/4 max-sm:w-full">{place.description}</p>
                  <img src={place.images[0]} alt="" />
                </div>
                <div className="flex justify-around my-4 max-sm:flex-col max-sm:gap-4">
                  <img src={place.images[1]} alt="" />
                  <img src={place.images[2]} alt="" />
                </div>
              </div>
            </div >
            <div>
              <h3 className="text-xl italic">{place.title} is a trip of maximum {place.duration} hours and about {place.distance} kilometers</h3>
              <h3>Coordinates:</h3>
              <Link to="https://geohack.toolforge.org/geohack.php?pagename=Kolukkumalai&params=10.075_N_77.221_E_type:landmark_region:IN-TN">
                <h3>{place.location.coordinates[0]}°E {place.location.coordinates[1]}°N</h3>
              </Link>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl ">Key Details</h2>
              <ul className="mt-4">
                <li>Difficulty: {place.difficulty}</li>
                <li>Best Season: {place.season}</li>
                <li>Best time: {place.bestTime}</li>
                <li>Route: {place.route}</li>
              </ul>
            </div>
            {place.tips.length !== 0 && (
              <div className="mt-8">
                <h2 className="text-2xl">Tips</h2>
                <ul className="mt-4">
                  {place.tips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )
      }
    </div >
  )
}
