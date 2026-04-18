import { useEffect } from "react"
import toast from "react-hot-toast"
import api from "../api/api"
import { useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import Navbar from "./Navbar"
import SearchBar from "./SearchBar"

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
        <SearchBar />
        {loading && (<h1>Loading</h1>)}
        <div className="text-white grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 justify-around mb-4 mt-8 ml-8
          grid-cols-2 max-sm:text-xs">
          <form className="flex gap-2 items-center">
            <label>Difficulty:</label>
            <select onChange={handleChange} className="select-bar bg-gray-700 p-2 sm:text-sm" name="difficulty">
              <option value="">All Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Moderate">Moderate</option>
              <option value="Hard">Hard</option>
            </select>
          </form>
          <form className="flex gap-2 items-center">
            <label>Season:</label>
            <select onChange={handleChange} className="select-bar bg-gray-700 p-2 sm:text-sm" name="bestSeason">
              <option value="">All Seasons</option>
              <option value="Summer">Summer</option>
              <option value="Winter">Winter</option>
              <option value="Monsoon">Monsoon</option>
            </select>
          </form>
          <form className="flex gap-2 items-center">
            <label>District:</label>
            <select onChange={handleChange} className="select-bar bg-gray-700 p-2 sm:text-sm" name="district">
              <option value="">All Districts</option>
              <option value="Wayanad">Wayanad</option>
              <option value="Idukki">Idukki</option>
              <option value="Thiruvananthapuram">Thiruvananthapuram</option>
              <option value="Thirunalveli">Thirunalveli</option>
              <option value="Theni">Theni</option>
              <option value="Eranakulam">Eranakulam</option>
            </select>
          </form>
        </div>
        {trending && (
          <h1>Trending Places</h1>
        )}
        <div className="4 justify-around gap-4 
          grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:justify-around  m-8 
          grid-cols-2">
          {places.length > 0 &&
            places.map((place) => (
              <div className="" key={place._id}>
                <img className="rounded-t-2xl object-cover w-full sm:h-96 h-28" src={place.images[0]} alt="" />
                <Link to={`/place/${place._id} `} > <h2 className="text-gray-400 font-bold ml-2 mt-2 hover:cursor-pointer">{place.title}</h2></Link>
              </div>
            ))}
        </div>
      </div>
    </div >
  )
}
