import { useEffect, useState } from "react"
import api from "../api/api.js"
import { Link, useParams } from "react-router-dom"
import toast from "react-hot-toast"
import Navbar from "../components/Navbar.jsx"
import { useForm } from "react-hook-form"
import { checkUser } from "../utils/auth.js"

export default function PlaceDetails() {
  const { id } = useParams()
  const [place, setPlace] = useState({})
  const [reviews, setReviwes] = useState({})
  const [newReview, setNewReview] = useState(null)
  const [loading, setLoading] = useState(true)
  const [rating, setRating] = useState(1)
  const { register, handleSubmit } = useForm()
  const [user, setUser] = useState(checkUser())
  const [isBook, setIsBook] = useState(false)

  useEffect(() => {
    if (!id) return
    const fetchData = async () => {
      try {
        const placeRes = await api.get(`/place/${id}`)
        setPlace(placeRes.data)

        const reviewRes = await api.get(`/review/place/${id}`)
        setReviwes(reviewRes.data)

        if (user?._id) {
          const userRes = await api.get(`/auth/user/${user._id}`)
          setUser(userRes.data)

          setIsBook(
            userRes.data.bookmarks?.some(
              b => b === placeRes.data._id || b._id === placeRes.data._id
            )
          )
        }

      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  async function onSubmit(data) {
    try {
      const res = await api.post('/review', {
        place: place._id,
        userId: user.id || user._id,
        userEmail: user.email,
        rating: rating,
        review: data.review,
        placeTitle: place.title,
      })
      setNewReview(res.data)
      toast.success(res.data.message)
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong"
      console.log(message)
    }
  }

  async function addToBookmarks() {
    try {
      const res = await api.post(`auth/bookmarks/${id}`,
        { id: user._id })
      toast.success(res.data.message)
      setUser(res.data.updatedUser)
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong"
      console.log(message)
    }
  }

  async function removeFromBookmarks() {
    try {
      const res = await api.delete(`auth/bookmarks/${id}`,
        { data: { id: user._id } })
      toast.success(res.data.message)
      setUser(res.data.updatedUser)
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong"
      console.log(message)
    }
  }
  if (loading || !place) {
    return <p>Loading...</p>
  }
  return (
    <div>
      <Navbar />
      {loading || !place ? 'Loading...'
        : (
          <div className="mx-8 text-white">
            <div className="h-fit py-4 text-gray-300">
              <div className="flex flex-col gap-8 max-sm:gap-2">
                <div className="flex justify-between">
                  <h1 className="text-4xl max-sm:text-2xl">{place.title}</h1>
                  {isBook ? (
                    <button onClick={removeFromBookmarks}>
                      <svg className="object-cover h-8 fill-gray-300 hover:fill-gray-500 hover:cursor-pointer m-4" title="hi"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M192 64C156.7 64 128 92.7 128 128L128 544C128 555.5 134.2 566.2 144.2 571.8C154.2 577.4 166.5 577.3 176.4 571.4L320 485.3L463.5 571.4C473.4 577.3 485.7 577.5 495.7 571.8C505.7 566.1 512 555.5 512 544L512 128C512 92.7 483.3 64 448 64L192 64z" /></svg>
                    </button>
                  ) : (
                    <button onClick={addToBookmarks}>
                      <svg className="object-cover h-8 fill-gray-700 hover:fill-gray-500 hover:cursor-pointer m-4" title="hi"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M192 64C156.7 64 128 92.7 128 128L128 544C128 555.5 134.2 566.2 144.2 571.8C154.2 577.4 166.5 577.3 176.4 571.4L320 485.3L463.5 571.4C473.4 577.3 485.7 577.5 495.7 571.8C505.7 566.1 512 555.5 512 544L512 128C512 92.7 483.3 64 448 64L192 64z" /></svg>
                    </button>
                  )}
                </div>
                <p>Rating: {place?.rating?.toFixed(2)}</p>
                <div className="flex gap-4 w-full max-sm:flex-col">
                  <p className="w-3/4 max-sm:w-full">{place.description}</p>
                </div>
                <div className="flex justify-around my-4 max-sm:flex-col max-sm:gap-4 flex-wrap">
                  {place?.images?.map((i) => (
                    <img key={i._id} src={i.url} alt="" className="object-cover h-38 mt-4" />
                  ))}
                </div>
              </div>
            </div >
            <div className="text-gray-300 flex flex-col gap-2">
              <h3 className="text-xl italic">{place.title} is a trip of maximum {place.duration} hours and about {place.distance} kilometers</h3>
              <h3>Coordinates:</h3>
              <h3>{place?.location?.coordinates[0]}°E {place?.location?.coordinates[1]}°N</h3>
              <Link to={`/search?lon=${place?.location?.coordinates[0]}&lat=${place?.location?.coordinates[1]}&within=10`}>
                <button className="bg-gray-600 py-2 px-3 w-fit rounded hover:cursor-pointer">Places near {place.title}</button>
              </Link>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl ">Key Details</h2>
              <ul className="mt-4 text-gray-300">
                <li>Difficulty: {place?.difficulty?.map(d => (`${d} `))}</li>
                <li>Best Season: {place.season}</li>
                <li>Best time: {place.bestTime}</li>
                <li>Route: {place.route}</li>
              </ul>
            </div>
            {place.tips?.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl">Tips</h2>
                <ul className="mt-4">
                  {place.tips.map((tip) => (
                    <li className="text-gray-300" key={tip}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="m-8 flex flex-col gap-4">
              <div className="h-1 bg-gray-600">
              </div>
              {user && (
                <div>
                  <h3 className="text-2xl text-center">Add Review</h3>
                  <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col items-center gap-8">
                      <textarea className="bg-gray-600 w-3/4 max-sm:w-full h-40 rounded-2xl p-4" placeholder="Enter your Review" {...register("review")} />
                    </div>
                    <div className="flex gap-4 justify-center">
                      <h4 className="mt-1">Rating:</h4>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} onClick={() => setRating(star)} className={` ${star <= rating ? 'fill-white' : 'fill-gray-600'}`} >
                          <svg className="h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z" /></svg>
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-end mr-35 max-sm:mr-0">
                      <button className="bg-gray-400 py-2 px-4 rounded-xl hover:cursor-pointer text-black">Submit</button>
                    </div>
                  </form>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl">Reviews</h1>
              {reviews?.length > 0 ? (
                <div className="text-white  flex flex-col gap-4">
                  {reviews.map((review) => (
                    <div key={review._id} className="bg-gray-600 p-2">
                      <h4 className="bg-gray-700 pl-4">{review.userEmail}</h4>
                      <p className="ml-4">{review.review}</p>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} onClick={() => setRating(star)} className={` ${star <= review.rating ? 'fill-white' : 'fill-black'}`} >
                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z" /></svg>
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No reviews here</p>
              )}
            </div>
          </div>
        )
      }
    </div >
  )
}
