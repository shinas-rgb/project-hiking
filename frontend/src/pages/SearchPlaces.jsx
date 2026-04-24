import { useEffect } from "react"
import api from "../api/api"
import { useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import Navbar from "../components/Navbar.jsx"
import SearchBar from "../components/SearchBar"
import Overlay from "../components/Overlay"
import SliderBar from "../components/Slider"

export default function SearchPlaces() {
  const [places, setPlaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [duration, setDuration] = useState([1, 50])
  const [distance, setDistance] = useState([1, 20])
  const [season, setSeason] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [district, setDistrict] = useState("")
  const [locLimit, setLocLimit] = useState(10)
  const [checked, setChecked] = useState(false)
  const [sortBy, setSortBy] = useState("")
  const [sortDirection, setSortDirection] = useState(1)
  let [filter, setFilter] = useState(false)
  const [searchParams] = useSearchParams();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const res = await api.get(`/place/search`, {
          params: searchParams
        })
        setPlaces(res.data.places)
        if (!searchParams.has("trending"))
          setFilter(true)
      } catch (error) {
        const message = error.response?.data?.message || "Something went wrong"
        console.error(message)
      } finally {
        setLoading(false)
      }
    }
    fetchSearch()
  }, [searchParams])

  function handleChange(e) {
    const { name, value } = e.target
    if (!searchParams.has(name)) {
      setFilter(true)
      searchParams.delete("trending")
      navigate(`/search?${searchParams}&${name}=${value}`)
    }
    else {
      setFilter(true)
      searchParams.set(name, value)
      navigate(`/search?${searchParams}`)
    }
  }

  function handleDuration() {
    if (!searchParams.has('lDuration')) {
      setFilter(true)
      searchParams.delete("trending")
      navigate(`/search?${searchParams}&lDuration=${duration[0]}&hDuration=${duration[1]}`)
    }
    else {
      setFilter(true)
      searchParams.set('lDuration', duration[0])
      searchParams.set('hDuration', duration[1])
      navigate(`/search?${searchParams}`)
    }
  }
  function handleDistance() {
    if (!searchParams.has('lDistance')) {
      setFilter(true)
      searchParams.delete("trending")
      navigate(`/search?${searchParams}&lDistance=${distance[0]}&hDistance=${distance[1]}`)
    }
    else {
      setFilter(true)
      searchParams.set('lDistance', distance[0])
      searchParams.set('hDistance', distance[1])
      navigate(`/search?${searchParams}`)
    }
  }

  function clearFilter() {
    setFilter(false)
    setLocLimit(5)
    navigate(`/search?trending=true`)
  }

  function handleLocationWithin(val) {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      setFilter(true)
      const { latitude, longitude } = pos.coords
      if (!searchParams.has("lat")) {
        navigate(`/search?lon=${longitude}&lat=${latitude}&within=${locLimit}`)
      } else {
        searchParams.set('within', val)
        navigate(`/search?${searchParams}`)
      }
    })
  }

  function handleChecked(e) {
    setChecked(e.target.checked)
    if (checked) {
      navigate(`/search?trending=true`)
    } else {
      handleLocationWithin()
    }
  }

  function handleLocationLimit(e) {
    handleLocationWithin(e.target.value)
    setLocLimit(e.target.value)
  }


  function handleSort(updatedSortBy = sortBy, updatedDirection = sortDirection) {
    if (!updatedSortBy) return

    const params = searchParams
    params.set(updatedSortBy, updatedDirection)
    setFilter(true)

    navigate(`/search?${params}`)
  }

  if (loading) {
    return <div className="flex justify-center text-xl items-center h-screen">
      <h1>Loading...</h1>
    </div>
  }
  return (
    <div>
      <div className="w-full">
        <Navbar />
        <div className="mt-4">
          <SearchBar />
        </div>
        <div className="text-white  grid max-sm:text-xs">
          {open && (
            <div className="text-black">
              <Overlay isOpen={open} onClose={() => setOpen(false)}>
                <div className=" flex justify-center mb-4">
                  <h2>Filter</h2>
                </div>
                <form>
                  <div className="flex max-sm:flex-col justify-around gap-2 mb-4">
                    <div className="text-center max-sm:flex max-sm:flex-col max-sm:items-center">
                      <p>Difficulty</p>
                      <fieldset onChange={handleChange} className="border-2 p-2 max-sm:w-fit bg-gray-600 text-white border-black rounded-xl">
                        <select name="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                          <option value="">All difficulty</option>
                          <option value="easy">Easy</option>
                          <option value="moderate">Moderate</option>
                          <option value="hard">Hard</option>
                        </select>
                      </fieldset>
                    </div>
                    <div className="text-center max-sm:flex max-sm:flex-col max-sm:items-center">
                      <p>Season</p>
                      <fieldset onChange={handleChange} className="border-2 max-sm:w-fit p-2 bg-gray-600 text-white border-black rounded-xl">
                        <select name="bestSeason" value={season} onChange={(e) => setSeason(e.target.value)}>
                          <option value="">All Season</option>
                          <option value="winter">Winter</option>
                          <option value="summer">Summer</option>
                          <option value="monsoon">Monsoon</option>
                          <option value="Autunm">Autunm</option>
                        </select>
                      </fieldset>
                    </div>
                    <div className="text-center max-sm:flex max-sm:flex-col max-sm:items-center">
                      <p>District</p>
                      <fieldset onChange={handleChange} className="border-2 p-2 max-sm:w-fit bg-gray-600 text-white border-black rounded-xl">
                        <select name="district" value={district} onChange={(e) => setDistrict(e.target.value)}>
                          <option value="">All districts</option>
                          <option value="wayanad">Wayanad</option>
                          <option value="theni">Theni</option>
                          <option value="eranakulam">Eranakulam</option>
                          <option value="idukki">Idukki</option>
                          <option value="malappuram">Malappuram</option>
                        </select>
                      </fieldset>
                    </div>
                  </div>
                </form>
                <div>
                  <form className="flex gap-2 items-center">
                    <input type="checkbox" checked={checked} onChange={handleChecked} />
                    <label>Nearby Places within(km)</label>
                    <input type="number" min="1" className="w-14 bg-gray-400 py-1 px-2 rounded border" value={locLimit} onChange={(e) => handleLocationLimit(e)} />
                  </form>
                </div>
                <div className="flex justify-around max-sm:flex-col max-sm:items-center max-sm:gap-4">
                  <form onChange={handleDuration} className="w-44">
                    <label>Duration (Hour)</label>
                    <SliderBar
                      min={1}
                      max={50}
                      value={duration}
                      onChange={setDuration} />
                  </form>
                  <form onChange={handleDistance} className="w-44">
                    <label>Distance (Km)</label>
                    <SliderBar
                      min={1}
                      max={20}
                      value={distance}
                      onChange={setDistance} />
                  </form>
                </div>
              </Overlay>
            </div>
          )}
          <div className="w-full">
            <div className="flex gap-28 content-center items-center justify-end mr-8 max-sm:mt-4">
              {filter && (
                <div className="flex justify-end max-sm:mb-1 mb-1">
                  <button onClick={() => { clearFilter(); setFilter(false) }} className="underline hover:text-blue-600 hover:cursor-pointer">Clear Filters</button>
                </div>
              )}
              <div className="flex flex-col gap-2">
                <button className="flex hover:cursor-pointer gap-1" onClick={() => setOpen(true)}>
                  <h4 className="max-sm:text-xs">Filter</h4>
                  <svg className="h-7 fill-white max-sm:h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M96 128C83.1 128 71.4 135.8 66.4 147.8C61.4 159.8 64.2 173.5 73.4 182.6L256 365.3L256 480C256 488.5 259.4 496.6 265.4 502.6L329.4 566.6C338.6 575.8 352.3 578.5 364.3 573.5C376.3 568.5 384 556.9 384 544L384 365.3L566.6 182.7C575.8 173.5 578.5 159.8 573.5 147.8C568.5 135.8 556.9 128 544 128L96 128z" /></svg>
                </button>
                <div className="flex">
                  <fieldset onChange={handleSort}>
                    <select name="sort" value={sortBy} onChange={(e) => {
                      const value = e.target.value
                      setSortBy(value)
                      handleSort(value, sortDirection)
                    }}>
                      <option value="">Sort</option>
                      <option value="distance">Distance</option>
                      <option value="duration">Duration</option>
                    </select>
                  </fieldset>
                  {sortDirection === 1 ? (
                    <button onClick={() => {
                      const newDirection = -1
                      setSortDirection(newDirection);
                      handleSort(sortBy, newDirection)
                    }}>
                      <h1>v</h1>
                    </button>
                  ) : (
                    <button onClick={() => {
                      const newDirection = 1
                      setSortDirection(newDirection);
                      handleSort(sortBy, newDirection);
                    }}>
                      <h1 className="text-2xl">^</h1>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          searchParams.has("trending") && (
            <h1 className="text-2xl sm:m-8 m-4">Trending Places</h1>
          )
        }
        {
          searchParams.has("bookmarks") && (
            <h1 className="text-2xl sm:m-8 m-4">Bookmarked Places</h1>
          )
        }
        <div className="4 justify-around gap-4 
          grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:justify-around  m-8 
          grid-cols-2">
          {places?.length > 0 &&
            places.map((place) => (
              <div className="" key={place._id}>
                <img className="rounded-t-2xl object-cover w-full sm:h-96 h-28" src={place.images[0]?.url} alt="" />
                <Link to={`/place/${place._id} `} > <h2 className="text-gray-400 font-bold ml-2 mt-2 hover:cursor-pointer">{place.title}</h2></Link>
              </div>
            ))}
        </div>
      </div >
    </div >
  )
}
