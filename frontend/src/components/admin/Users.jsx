import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import api from "../../api/api"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import Overlay from "../Overlay"

export default function Users() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [places, setPlaces] = useState([])
  const [reviews, setReviews] = useState([])
  const [searches, setSearches] = useState([])
  const { id } = useParams()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const { handleSubmit } = useForm()

  useEffect(() => {
    if (!id) return
    const fetchAll = async () => {
      try {
        const [userRes, placeRes, reviewRes, searchRes] = await Promise.all([
          api.get(`/auth/user/${id}`),
          api.get('/place/search', {
            params: { createdBy: id }
          }),
          api.get(`/review/user/${id}`),
          api.get(`/place/search`, {
            params: { bookmarks: "true", id: id }
          })
        ])
        setUser(userRes.data)
        setPlaces(placeRes.data.places)
        setReviews(reviewRes.data)
        setSearches(searchRes.data.places)
      } catch (error) {
        console.log(error)
        const message = error.response?.data?.message
        toast.error(message)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [id])

  async function deleteUser() {
    try {
      const res = await api.delete(`/auth/account`, {
        data: { id }
      })
      toast.success(res.data.message)
      navigate('/admin')
    } catch (error) {
      const message = error.response?.data?.message
      toast.error(message)
    }
  }
  return (
    <>
      <div>
        {open && (
          <Overlay isOpen={open} onClose={() => setOpen(false)}>
            <form onSubmit={handleSubmit(deleteUser)}>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                  <h2 className="text-black">Do you really want to delete this account?</h2>
                  <div className="flex justify-end">
                    <button type="submit" className="bg-red-500 hover:cursor-pointer hover:bg-red-600 px-2 border-4 text-white">Yes</button>
                  </div>
                </div>
              </div>
            </form>
          </Overlay>
        )}
        <div className="m-4 ">
          <div>
            {!loading ? (
              <div className="flex flex-col gap-4">
                <h1>Email: {user?.email}</h1>
                <h1>Role: {user?.role}</h1>
                <div className="text-gray-300">
                  <h1>Posts: </h1>
                  {places.length > 0 ? (
                    <div className="text-gray-400 ml-4 hover:cursor-auto w-fit">
                      {places.map((place) => (
                        <Link key={place._id} to={`/place/${place._id}`}>
                          <p className="hover:text-gray-300">{place.title}</p>
                        </Link>
                      ))
                      }
                    </div>
                  ) : (
                    <p className="ml-4">No places</p>
                  )}
                </div>
                <div className="text-gray-300 flex flex-col gap-2">
                  <h1>Reviews: </h1>
                  {reviews.length > 0 ? (
                    <div className="ml-4 flex gap-2 flex-wrap">
                      {reviews.map((review) => (
                        <div key={review._id} className="bg-gray-700 border w-fit p-3">
                          <p>Place: {review.placeTitle}</p>
                          <p>Review: {review.review}</p>
                          <p>Rating: {review.rating}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="ml-4">You have no reviews</p>
                  )}
                </div>
                <div>
                  <h1>Bookmarks</h1>
                  {searches?.length > 0 ? (
                    <div className="ml-4 flex gap-1 flex-col">
                      {searches.map((s) => (
                        <div key={s._id} >
                          <Link to={`/place/${s._id}`}>
                            <p className="text-gray-400 hover:text-gray-300 w-fit">{s.title}</p>
                          </Link>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No bookmarks</p>
                  )}
                </div>
                {user.role !== 'admin' && (
                  <div className="flex">
                    <button onClick={() => setOpen(true)} className="bg-red-300 border-2 hover:cursor-pointer hover:bg-red-400 py-2 px-3 text-red-900 rounded-2xl">Delete User</button>
                  </div>
                )}
              </div>
            ) : (
              <h1>Loading...</h1>
            )}
          </div>
        </div>
      </div >
    </>
  )
}
