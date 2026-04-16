import { useEffect } from "react"
import toast from "react-hot-toast"
import api from "../api/api"
import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import Navbar from "./Navbar"
import SearchBar from "./SearchBar"

export default function SearchPlaces() {
  const [places, setPlaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const res = await api.get(`/place/search?search=${query}`)
        setPlaces(res.data)
        setLoading(false)
      } catch (error) {
        const message = error.response?.data?.message || "Something went wrong"
        toast.error(message)
      }
    }
    fetchSearch()
  }, [query])


  return (
    <div>
      <div className="w-screen">
        <Navbar />
        <SearchBar />
        {loading && (<h1>Loading</h1>)}
        <div className="grid grid-cols-4 justify-around gap-4 p-4">
          {places.length > 0 &&
            places.map((place) => (
              <div className="" key={place._id}>
                <img className="rounded-t-2xl object-cover w-full h-96" src={place.link} alt="" />
                <Link to={`/place/${place._id}`} > <h2 className="font-bold ml-2 mt-2 hover:cursor-pointer">{place.title}</h2></Link>
              </div>
            ))}
        </div>
      </div>
    </div >
  )
}
