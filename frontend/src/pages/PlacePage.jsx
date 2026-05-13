import { useEffect, useState } from "react"
import api from "../api/api.js"
import { Link, useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast"
import Navbar from "../components/Navbar.jsx"
import back from "../assets/back.svg"
import { useForm } from "react-hook-form"
import { checkUser } from "../utils/auth.js"

export default function PlaceDetails() {
  const { id } = useParams()
  const [place, setPlace] = useState(null)
  const [reviews, setReviwes] = useState([])
  const [newReview, setNewReview] = useState(null)
  const [loading, setLoading] = useState(true)
  const [rating, setRating] = useState(1)
  const { register, handleSubmit } = useForm()
  const [user, setUser] = useState(checkUser())
  const [isBook, setIsBook] = useState(false)
  const [isRev, setIsRev] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const placeRes = await api.get(`/places/${id}`)
        setPlace(placeRes.data.data.place)

        const reviewRes = await api.get(`/reviews/${id}`)
        setReviwes(reviewRes.data.data)

        const userRes = await api.get(`/users`)
        setUser(userRes.data.data.user)

        setIsBook(
          userRes.data.data.user.bookmarks?.some(
            b => b === placeRes.data._id || b._id === placeRes.data._id
          )
        )

        setIsRev(
          reviewRes.data.data.some(b => b.userId === userRes.data.data.user._id ? true : false)
        )

      } catch (error) {
        const message = error.response?.data.message
        console.log(message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [newReview])

  async function onSubmit(data) {
    try {
      const res = await api.post(`/reviews/${place._id}`, {
        rating: rating,
        review: data.review,
      })
      setNewReview(res.data.data)
      toast.success(res.data.message)
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong"
      toast.error(message)
      console.log(message)
    }
  }

  async function addToBookmarks() {
    try {
      const res = await api.post(`users/bookmarks/add/${place._id}`)
      toast.success(res.data.message)
      setIsBook(true)
      setUser(res.data.data)
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong"
      toast.error(message)
    }
  }

  async function removeFromBookmarks() {
    try {
      const res = await api.post(`users/bookmarks/remove/${place._id}`)
      toast.success(res.data.message)
      setIsBook(false)
      setUser(res.data.data)
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong"
      toast.error(message)
    }
  }
  if (loading || !place) {
    return <div className="flex justify-center text-xl items-center h-screen">
      <h1>Loading...</h1>
    </div>
  }
  return (
    <div className="mx-4 sm:mx-8">
      {/* <Navbar /> */}
      <div className="my-4 sm:mb-16 flex justify-between">
        <button onClick={() => navigate(-1)}>
          <svg
            className="fill-white h-8"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7C291.2 490.2 291.2 469.9 278.7 457.4L173.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L173.3 288L278.7 182.6C291.2 170.1 291.2 149.8 278.7 137.3C266.2 124.8 245.9 124.8 233.4 137.3L73.4 297.3z" /></svg>
        </button>
        <h2 className="text-center canva-bold text-white text-2xl">{place.title}</h2>
        {isBook ? (
          <button onClick={removeFromBookmarks} className=" rounded-full">
            <svg className="object-cover h-7 fill-gray-300 hover:fill-gray-500 hover:cursor-pointer" title="hi"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M192 64C156.7 64 128 92.7 128 128L128 544C128 555.5 134.2 566.2 144.2 571.8C154.2 577.4 166.5 577.3 176.4 571.4L320 485.3L463.5 571.4C473.4 577.3 485.7 577.5 495.7 571.8C505.7 566.1 512 555.5 512 544L512 128C512 92.7 483.3 64 448 64L192 64z" /></svg>
          </button>
        ) : (
          <button onClick={addToBookmarks} className="rounded-full">
            <svg className="object-cover h-7 fill-gray-700 hover:fill-gray-500 hover:cursor-pointer" title="hi"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M192 64C156.7 64 128 92.7 128 128L128 544C128 555.5 134.2 566.2 144.2 571.8C154.2 577.4 166.5 577.3 176.4 571.4L320 485.3L463.5 571.4C473.4 577.3 485.7 577.5 495.7 571.8C505.7 566.1 512 555.5 512 544L512 128C512 92.7 483.3 64 448 64L192 64z" /></svg>
          </button>
        )}
      </div>
      <div className=" text-white canva-regular">
        <div className="sm:grid grid-cols-2 gap-4">
          <div className="mb-4">
            <img src={place.images[0].url} className="object-cover aspect-video bg-center rounded-2xl" />
          </div>
          <div className="flex gap-4 w-full max-sm:flex-col my-4">
            <p className="w-3/4  text-gray-300 max-sm:w-full">{place.description}</p>
          </div>
        </div>
        <div className="h-fit">
          <div className="flex flex-col gap-8 max-sm:gap-2">
            <div className="bg-white border border-zinc-300 w-fit text-black rounded-xl px-2 py-1 canva-bold flex gap-1">
              <p>Rating: {place?.rating?.toFixed(2)}</p>
              <svg className="h-5 mt-0.5 fill-amber-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z" /></svg>
            </div>
            <div className="flex justify-around my-4 max-sm:flex-col max-sm:gap-4 flex-wrap">
              {place?.images?.slice(1,).map((i) => (
                <img key={i._id} src={i.url} alt="" className="object-cover h-38 mt-4 rounded-2xl" />
              ))}
            </div>
          </div>
        </div >
        <div>
          <div className="bg-zinc-700 h-0.5 w-full my-2" />
          <div className="mx-6 my-4 sm:mx-12">
            <table className="w-full divide-y-0 table-fixed">
              <thead>
                <tr className="text-left text-sm text-zinc-400">
                  <th className="py-3">Duration</th>
                  <th>Distance</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-xl">
                  <td className="py-2">{place.duration} hours</td>
                  <td>{place.distance} kilometers</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-zinc-700 h-0.5 w-full my-2" />
        </div>
        <div className="text-gray-300 flex flex-col gap-2">
          <h3>Coordinates:</h3>
          <h3>{place?.location?.coordinates[0]}°E {place?.location?.coordinates[1]}°N</h3>
          <Link to={`/search?lon=${place?.location?.coordinates[0]}&lat=${place?.location?.coordinates[1]}&within=10`}>
            <button className="canva-bold hover:cursor-pointer text-white mt-2">Places near {place.title} →</button>
          </Link>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl canva-bold">Key Details</h2>
          <ul className="mt-4 text-gray-300 space-y-3">
            <li className="bg-zinc-800 w-fit px-3 py-2 rounded-xl">Difficulty: {place?.difficulty?.map(d => (`${d} `))}</li>
            <li className="bg-zinc-800 w-fit px-3 py-2 rounded-xl">Best Season: {place.season}</li>
            <li className="bg-zinc-800 w-fit px-3 py-2 rounded-xl">Best time: {place.bestTime}</li>
            <li className="bg-zinc-800 w-fit px-3 py-2 rounded-xl">Route: {place.route}</li>
          </ul>
        </div>
        {place.tips?.length > 1 && (
          <div className="mt-8">
            <h2 className="text-2xl canva-bold">Tips</h2>
            <ol className="mt-4 list-decimal list-inside space-y-3">
              {place.tips.map((tip) => (
                <li className="text-gray-300" key={tip}>{tip}</li>
              ))}
            </ol>
          </div>
        )}

        <div className="bg-zinc-700 h-0.5 w-full my-4" />
        <div className=" flex flex-col gap-4">
          {user ? (
            <div>
              {isRev ? (
                <div className="text-center">
                  <p className="text-zinc-100 canva-bold">You already reviewed this place</p>
                </div>
              ) : (
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col items-center gap-8">
                    <textarea className="bg-zinc-800 border border-zinc-700 text-sm w-3/4 max-sm:w-full h-20 rounded-2xl p-3" placeholder="Add your review" {...register("review")} />
                  </div>
                  <div className="flex gap-2 justify-center">
                    <p className="">Rating:</p>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} onClick={() => setRating(star)} className={` ${star <= rating ? 'fill-amber-500' : 'fill-gray-600'}`} >
                        <svg className="h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z" /></svg>
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-end mr-35 max-sm:mr-0">
                    <button className="bg-zinc-500 py-1.5 canva-bold px-3 rounded-xl hover:cursor-pointer text-white" type="submit">Submit</button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <div className="text-center">
              <Link to="/auth">
                <p className="text-zinc-100 canva-bold">Log in to add review</p>
              </Link>
            </div>
          )}
        </div>
        <div className="bg-zinc-700 h-0.5 w-full my-4" />
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl canva-bold">Reviews</h2>
          {reviews?.length > 0 ? (
            <div className="text-white  flex flex-col gap-4 mb-4">
              {reviews.map((review) => (
                <div key={review._id} className="bg-zinc-800 rounded-xl p-2">
                  <div className="flex justify-between">
                    <p className=" canva-bold">{review.userName}</p>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} onClick={() => setRating(star)} className={` ${star <= review.rating ? 'fill-white' : 'fill-black'}`} >
                          <svg className="h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z" /></svg>
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="ml-4">{review.review}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No reviews here</p>
          )}
        </div>
      </div>
    </div >
  )
}
