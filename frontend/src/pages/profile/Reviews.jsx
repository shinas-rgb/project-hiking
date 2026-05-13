import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import api from "../../api/api.js"
import { Link, useNavigate } from "react-router-dom"
import Loading from "../../components/Loading.jsx"

export default function Reviews() {
  const [reviews, setReviews] = useState({})
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get(`/reviews`)
        setReviews(res.data.data)
        console.log(res.data.data)
      } catch (error) {
        const message = error.respose?.data?.message || "Something went wrong"
        toast.error(message)
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [])

  if (loading) {
    return (
      <Loading />
    )
  }
  return (
    <>
      <div className="my-4 h-screen text-white">
        <div className=" flex">
          <button onClick={() => navigate(-1)}>
            <svg
              className="fill-white h-8"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7C291.2 490.2 291.2 469.9 278.7 457.4L173.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L173.3 288L278.7 182.6C291.2 170.1 291.2 149.8 278.7 137.3C266.2 124.8 245.9 124.8 233.4 137.3L73.4 297.3z" /></svg>
          </button>
          <h2 className="text-center w-full mr-8 canva-bold text-white text-2xl">Reviews</h2>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            {reviews.length > 0 ? (
              <div className="sm:grid grid-cols-3 gap-4">
                {reviews.map((r) => (
                  <Link to={`/place/${r.place}`}>
                    <div key={r._id} className="my-4 p-2 bg-zinc-800 rounded-2xl border border-zinc-700">
                      <h3 className="text-xl font-bold my-2 hover:text-gray-300 hover:cursor-pointer">{r.placeTitle || r.placeName}</h3>
                      <p className="ml-4">{r.review}</p>
                      <p className="ml-4">Rating: {r.rating}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-white text-center mt-54">
                <p>You have no reviews</p>
              </div>
            )}
          </div>
        </div>
      </div >
    </>
  )
}
