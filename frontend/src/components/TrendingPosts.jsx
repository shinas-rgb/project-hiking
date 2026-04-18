import { useEffect, useState } from "react"
import api from "../api/api.js"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"

export default function TrendingPosts() {
  const [loading, setLoading] = useState(true)
  const [places, setPlaces] = useState([])
  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const res = await api.get("/place")
        setPlaces(res.data)
        setLoading(!loading)
      } catch (error) {
        const message = error.response?.data?.message || "Something went wrong"
        toast.error(message)
      }
    }
    fetchPlace()
  }, [])
  return (
    <div className='page'>
      {loading && <h1>Loading....</h1>}
      {places.length > 0 && (
        <div className="place-container
          grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:justify-around  gap-8 m-8
          ">
          {places.map((place) => (
            <div className="place-card bg-gray-900" key={place._id}>
              <img className="place-image" src={place.images[0]} alt="" />
              <Link to={`/place/${place._id}`} >
                <h2 className="font-bold text-gray-400 ml-2 mt-2 hover:cursor-pointer">{place.title}</h2>
              </Link>
            </div>
          ))
          }
        </div >
      )
      }
    </div >
  )
}
