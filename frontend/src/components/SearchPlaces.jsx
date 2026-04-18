import { useEffect } from "react"
import toast from "react-hot-toast"
import api from "../api/api"
import { useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import Navbar from "./Navbar"

export default function SearchPlaces() {
  const [places, setPlaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams();
  let [trending, setTrending] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const res = await api.get(`/place/search`, {
          params: searchParams
        })
        setPlaces(res.data.places)
        setTrending(res.data.trending)
        setLoading(false)
      } catch (error) {
        const message = error.response?.data?.message || "Something went wrong"
        toast.error(message)
      }
    }
    fetchSearch()
  }, [searchParams])

  function handleChange(e) {
    const { name, value } = e.target
    if (!searchParams.has(name)) {
      searchParams.delete("trending")
      navigate(`/search?${searchParams}&${name}=${value}`)
    }
    else {
      searchParams.set(name, value)
      navigate(`/search?${searchParams}`)
    }
  }

  return (
    <div>
      <div className="w-screen">
        <Navbar />
        {loading && (<h1>Loading</h1>)}
        <div className="text-white flex gap-4 mb-4">
          <form className="flex gap-2">
            <label>Difficulty:</label>
            <select onChange={handleChange} className="select-bar bg-gray-700 p-2 text-sm" name="difficulty">
              <option value="">All Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Moderate">Moderate</option>
              <option value="Hard">Hard</option>
            </select>
          </form>
          <form className="flex gap-2">
            <label>Season:</label>
            <select onChange={handleChange} className="select-bar bg-gray-700 p-2 text-sm" name="bestSeason">
              <option value="">All Seasons</option>
              <option value="Summer">Summer</option>
              <option value="Winter">Winter</option>
              <option value="Monsoon">Monsoon</option>
            </select>
          </form>
        </div>
        {trending && (
          <h1>Trending Places</h1>
        )}
        <div className="grid grid-cols-4 justify-around gap-4 p-4">
          {places.length > 0 &&
            places.map((place) => (
              <div className="" key={place._id}>
                <img className="rounded-t-2xl object-cover w-full h-96" src={place.images[0]} alt="" />
                <Link to={`/place/${place._id} `} > <h2 className="text-gray-400 font-bold ml-2 mt-2 hover:cursor-pointer">{place.title}</h2></Link>
              </div>
            ))}
        </div>
      </div>
    </div >
  )
}
