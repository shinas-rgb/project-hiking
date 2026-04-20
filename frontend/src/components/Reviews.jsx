import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import api from "../api/api"
import { checkUser } from "../utils/auth"
import { Link } from "react-router-dom"

export default function Reviews() {
  const user = checkUser()
  const [reviews, setReviews] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get('/review/user', {
          params: { user: user.id }
        })
        setReviews(res.data)
        setLoading(false)
      } catch (error) {
        const message = error.respose?.data?.message || "Something went wrong"
        toast.error(message)
      }
    }
    fetchReviews()
  }, [])
  return (
    <>
      <div className="m-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl">Your reviews</h1>
          {!loading ? (
            <div>
              {reviews.length > 0 ? (
                <div>
                  {reviews.map((r) => (
                    <div key={r._id} className="my-4">
                      <Link to={`/place/${r.place}`}>
                        <h3 className="text-xl font-bold my-2 hover:text-gray-300 hover:cursor-pointer">{r.placeTitle}</h3>
                      </Link>
                      <p className="ml-4">{r.review}</p>
                      <p className="ml-4">Rating: {r.rating}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>You have no reviews</p>
              )}
            </div>
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </div >
    </>
  )
}
