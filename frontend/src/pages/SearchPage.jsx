import { useEffect } from "react"
import api from "../api/api"
import { useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import Overlay from "../components/Overlay"
import SliderBar from "../components/Slider"
import Loader from "../components/Loader"
import Loading from "../components/Loading"
import toast from "react-hot-toast"

export default function SearchPlaces() {
  const [places, setPlaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [pages, setPages] = useState(1)
  const [page, setPage] = useState(1)
  const [totalItmes, setTotalItems] = useState(0)
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

  const [searchText, SetSearchText] = useState(searchParams.get("q") || "")

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        searchParams.set("page", page)
        navigate(`/search?${searchParams}`)
        const res = await api.get(`/places`, {
          params: searchParams
        })
        setPlaces(res.data.data.places)
        setPages(res.data.data.totalPages)
        setTotalItems(res.data.data.totalItmes)
      } catch (error) {
        const message = error.response?.data?.message || "Something went wrong"
        console.log(message)
      } finally {
        setLoading(false)
      }
    }
    fetchSearch()
  }, [searchParams, page])

  function handleChange(e) {
    const { name, value } = e.target
    setFilter(true)
    searchParams.set(name, value)
    navigate(`/search?${searchParams}`)
  }

  function handleDuration() {
    setFilter(true)
    searchParams.set('lDuration', duration[0])
    searchParams.set('hDuration', duration[1])
    navigate(`/search?${searchParams}`)
  }
  function handleDistance() {
    setFilter(true)
    searchParams.set('lDistance', distance[0])
    searchParams.set('hDistance', distance[1])
    navigate(`/search?${searchParams}`)
  }

  function clearFilter() {
    setFilter(false)
    setLocLimit(5)
    setSortDirection(1)
    setSortBy("")
    setDifficulty("")
    setSeason("")
    setDistrict("")
    navigate(`/search`)
  }


  function handleLocationWithin(val) {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      setFilter(true)
      const { latitude, longitude } = pos.coords
      searchParams.set('lon', longitude)
      searchParams.set('lat', latitude)
      searchParams.set('within', val)
      navigate(`/search?${searchParams}`)
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


  function handleSort(value, direction) {
    if (value !== "duration" && value !== "distance") return

    searchParams.delete("distance")
    searchParams.delete("duration")
    searchParams.set(value, direction)
    setFilter(true)

    navigate(`/search?${searchParams}`)
  }

  if (loading) {
    return <Loading />
  }
  return (
    <div>
      <div className="w-full">

        {/* Back button */}
        <div className="mx-6 my-6 flex">
          <Link to="/">
            <h4 className="absolute text-white text-4xl top-4 font-extrabold hover:cursor-pointer w-fit">⬅</h4>
          </Link>
          <h2 className="text-center canva-bold text-white w-full text-xl">Search</h2>
        </div>

        {/* Search Bar */}
        <div className='flex justify-center max-sm:text-xs'>
          <div className='bg-zinc-800 flex items-center border border-zinc-700 text-gray-300 py-2 px-3 rounded-2xl gap-1'>
            <button type="submit">
              <svg className='search-icon fill-zinc-600' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z" /></svg>
            </button>
            <form onSubmit={(e) => {
              e.preventDefault()
              navigate(`/search?q=${searchText}`)
            }}>
              <input type="text" placeholder="Search for places" value={searchText} onChange={(e) => SetSearchText(e.target.value)}
                className="w-fit text-base canva-regular" />
            </form>
            <button type="button" onClick={() => SetSearchText("")}>
              <p className="hover:cursor-pointer text-xs rounded-full px-1.5 bg-zinc-700 text-zinc-500">x</p>
            </button>
          </div >
        </div>

        <div className="text-white  grid max-sm:text-xs">
          <div className="w-full">
            <div className="flex gap-28 content-center items-center justify-end mr-8 max-sm:mt-4">
              {/* <div className="flex flex-col gap-2"> */}
              {/*   <button className="flex hover:cursor-pointer gap-1" onClick={() => setOpen(true)}> */}
              {/*     <h4 className="max-sm:text-xs">Filter</h4> */}
              {/*     <svg className="h-7 fill-white max-sm:h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M96 128C83.1 128 71.4 135.8 66.4 147.8C61.4 159.8 64.2 173.5 73.4 182.6L256 365.3L256 480C256 488.5 259.4 496.6 265.4 502.6L329.4 566.6C338.6 575.8 352.3 578.5 364.3 573.5C376.3 568.5 384 556.9 384 544L384 365.3L566.6 182.7C575.8 173.5 578.5 159.8 573.5 147.8C568.5 135.8 556.9 128 544 128L96 128z" /></svg> */}
              {/*   </button> */}
              {/*   <div className="flex"> */}
              {/*     <fieldset onChange={handleSort}> */}
              {/*       <select name="sort" value={sortBy} onChange={(e) => { */}
              {/*         setSortBy(e.target.value) */}
              {/*         handleSort(e.target.value, sortDirection) */}
              {/*       }} className="bg-gray-950 p-2"> */}
              {/*         <option value="">Sort</option> */}
              {/*         <option value="distance">Distance</option> */}
              {/*         <option value="duration">Duration</option> */}
              {/*       </select> */}
              {/*     </fieldset> */}
              {/*     <select onChange={(e) => { */}
              {/*       const value = e.target.value */}
              {/*       setSortDirection(e.target.value) */}
              {/*       handleSort(sortBy, value) */}
              {/*     }} */}
              {/*       className="bg-gray-400 text-black text-xs" */}
              {/*     > */}
              {/*       <option value={1}>Low - High</option> */}
              {/*       <option value={-1}>High - Low</option> */}
              {/*     </select> */}
              {/*   </div> */}
              {/* </div> */}
            </div>
          </div>
        </div>
        {
          searchParams.has("trending") && (
            <h1 className="text-xl sm:m-8 mx-4 mb-2">Trending Places</h1>
          )
        }
        {
          searchParams.has("bookmarks") && (
            <h1 className="text-2xl sm:m-8 mx-4 mb-2">Bookmarked Places</h1>
          )
        }
        <div className="flex justify-between text-white mx-8">
          <p className="canva-regular">{totalItmes} places found</p>
          <button onClick={() => setOpen(true)}>
            <svg className="h-7 fill-white max-sm:h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M96 128C83.1 128 71.4 135.8 66.4 147.8C61.4 159.8 64.2 173.5 73.4 182.6L256 365.3L256 480C256 488.5 259.4 496.6 265.4 502.6L329.4 566.6C338.6 575.8 352.3 578.5 364.3 573.5C376.3 568.5 384 556.9 384 544L384 365.3L566.6 182.7C575.8 173.5 578.5 159.8 573.5 147.8C568.5 135.8 556.9 128 544 128L96 128z" /></svg>
          </button>
        </div>
        {filter && (
          <div className="flex justify-end text-white mr-4 mt-2">
            <button onClick={() => { clearFilter(); setFilter(false) }} className="underline hover:text-blue-600 hover:cursor-pointer">
              Clear filters</button>
          </div>
        )}
        <div className="4 justify-around gap-4">
          {places?.length > 0 &&
            places.map((place) => (
              <div className="border-t border-zinc-600 m-4" key={place._id}>
                <Link to={`/place/${place._id} `} >
                  <div className="flex justify-between  mt-4">
                    <h2 className="text-white text-2xl canva-bold ml-2 mb-2 hover:cursor-pointer">{place.title}</h2>
                    <h3 className="flex gap-1 canva-bold text-zinc-300">
                      {place.rating.toFixed(2)}
                      <svg className="h-5 mt-0.5 fill-amber-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z" /></svg>
                    </h3>
                  </div>
                  <p className="text-zinc-400 mb-4 canva-regular">{place.description}</p>
                  <div className="flex flex-wrap justify-between">
                    {place.images.slice(0, 3).map((image) => (
                      <div className="mb-4">
                        <img src={image.url} className="object-cover rounded-xl h-25 aspect-square" />
                      </div>
                    ))}
                  </div>
                </Link>
              </div>
            ))}
        </div>
        <div className="flex gap-2 justify-center mb-4">
          {[...Array(pages)].map((_, index) => (
            <div key={index} className={`${page === index + 1 ? 'border-2 border-gray-500' : 'border-0'}`}>
              <button onClick={() => setPage(index + 1)}
                className="text-white px-2 hover:cursor-pointer"
              >{index + 1}</button>
            </div>
          ))}
        </div>
        {open && (
          <div className="text-black">
            <Overlay isOpen={open} onClose={() => setOpen(false)}>
              <div className=" flex justify-center mb-4">
                <h2>Filter</h2>
              </div>
              <form>
                <div className="flex flex-wrap justify-around mb-4">
                  <div className="text-center max-sm:flex max-sm:flex-col max-sm:items-center">
                    <p>Difficulty</p>
                    <fieldset onChange={handleChange}>
                      <select name="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}
                        className="border-2 p-2 max-sm:w-fit bg-gray-600 text-white border-black rounded-xl">
                        <option value="">All difficulty</option>
                        <option value="Easy">Easy</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Hard">Hard</option>
                      </select>
                    </fieldset>
                  </div>
                  <div className="text-center max-sm:flex max-sm:flex-col max-sm:items-center">
                    <p>Season</p>
                    <fieldset onChange={handleChange}>
                      <select name="bestSeason" value={season} onChange={(e) => setSeason(e.target.value)}
                        className="border-2 max-sm:w-fit p-2 bg-gray-600 text-white border-black rounded-xl">
                        <option value="">All Season</option>
                        <option value="Winter">Winter</option>
                        <option value="Summer">Summer</option>
                        <option value="Monsoon">Monsoon</option>
                        <option value="Autunm">Autunm</option>
                      </select>
                    </fieldset>
                  </div>
                  <div className="text-center max-sm:flex max-sm:flex-col max-sm:items-center">
                    <p>District</p>
                    <fieldset onChange={handleChange}>
                      <select name="district" value={district} onChange={(e) => setDistrict(e.target.value)}
                        className="border-2 max-sm:w-fit p-2 bg-gray-600 text-white border-black rounded-xl">
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
              <div className="flex justify-around max-sm:flex-col gap-2">
                <form onChange={handleDuration} className="w-full">
                  <label>Duration (Hour)</label>
                  <SliderBar
                    min={1}
                    max={50}
                    value={duration}
                    onChange={setDuration} />
                </form>
                <form onChange={handleDistance} className="w-full">
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
      </div >
    </div >
  )
}
