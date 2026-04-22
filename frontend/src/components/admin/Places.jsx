import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import api from "../../api/api"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import Overlay from "../Overlay"

export default function Places() {
  const { register, reset, handleSubmit } = useForm()
  const [open, setOpen] = useState(false)
  const [tips, setTips] = useState([""])
  const [features, setFeatures] = useState([""])
  const [files, setFiles] = useState(null)
  const { id } = useParams()
  const [place, setPlace] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [lat, setLat] = useState(null)
  const [lon, setLon] = useState(null)
  const [season, setSeason] = useState("")
  const [dur, setDur] = useState(null)
  const [dis, setDis] = useState(null)
  const [time, setTime] = useState("")
  const [route, setRoute] = useState("")
  const [images, setImages] = useState({})

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const res = await api.get(`/place/${id}`)
        setPlace(res.data)

        setTitle(res.data.title)
        setDesc(res.data.description)
        setLon(res.data.location.coordinates[0])
        setLat(res.data.location.coordinates[1])
        setSeason(res.data.season)
        setDur(res.data.duration)
        setDis(res.data.distance)
        setTime(res.data.bestTime)
        setRoute(res.data.route)
        setImages(res.data.images)
        setTips(res.data.tips)
        setFeatures(res.data.features)

        reset({
          season: res.data.bestSeason,
          difficulty: res.data.difficulty
        })
      } catch (error) {
        const message = error.response?.data?.message
        console.log(message)
      } finally {
        setLoading(false)
      }
    }
    fetchPlace()
  }, [id])


  async function onSubmit(data) {
    try {
      let uploadedImages = []

      if (files) {
        const formData = new FormData()
        for (let i = 0; i < files.length; i++) {
          formData.append('images', files[i])
        }

        const imageRes = await api.post('/upload', formData)
        uploadedImages = imageRes.data
      }

      const finalImages = [
        ...images,
        ...uploadedImages
      ]


      const res = await api.put('/place', {
        id: place._id,
        title: title,
        description: desc,
        images: finalImages,
        features: features,
        location: {
          type: "Point",
          coordinates: [Number(lon), Number(lat)]
        },
        difficulty: data.difficulty,
        bestSeason: data.season,
        season: season,
        bestTime: time,
        route: route,
        tips: tips,
        duration: dur,
        distance: dis,
      })

      toast.success(res.data.message)
      setPlace(res.data)
    } catch (error) {
      const message = error.response?.data?.message
      console.log(message)
    }
  }

  function handleTipsChange(index, value) {
    const updated = [...tips]
    updated[index] = value
    setTips(updated)
  }
  function handleFeaturesChange(index, value) {
    const updated = [...features]
    updated[index] = value
    setFeatures(updated)
  }

  function handleImage(e) {
    setFiles(e.target.files)
  }

  async function deletePlace() {
    try {
      const res = await api.delete(`/place/${place._id}`)
      toast.success(res.data.message)
      navigate('/admin')
    } catch (error) {
      const message = error.response?.data?.message
      console.log(message)
    }
  }
  return (
    <div>
      {open && (
        <Overlay isOpen={open} onClose={() => setOpen(false)}>
          <form onSubmit={handleSubmit(deletePlace)}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <h2 className="text-black">Do you really want to delete this place?</h2>
                <div className="flex justify-end">
                  <button type="submit" className="bg-red-500 hover:cursor-pointer hover:bg-red-600 px-2 border-4 text-white">Yes</button>
                </div>
              </div>
            </div>
          </form>
        </Overlay>
      )}
      <div className="my-4">
        <button onClick={() => setOpen(true)} className=" bg-red-500 text-white p-2 border-2 border-white rounded-2xl">Delete Place</button>
      </div>
      {!loading && (
        <div className=" grid justify-center w-fit sm:mx-4 mb-8 sm:w-fit">
          <div className="form-container bg-gray-300">
            <h1 className="text-2xl text-center mb-4 bg-black 
            max-sm:text-xl">Edit Place</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="new-form align-text-top flex gap-2">
              <div className="flex gap-2 max-sm:flex-col">
                <div className="flex flex-col" >
                  <label>Title</label>
                  <input
                    className="input-field"
                    type="text"
                    placeholder="Name of place"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title} />
                </div>
                <div className="flex flex-col">
                  <label>Cords</label>
                  <div className="">
                    <input
                      min="-180"
                      max="180"
                      step="any"
                      className="input-field"
                      type="number"
                      value={lon}
                      onChange={(e) => setLon(e.target.value)}
                      placeholder="Coordinates"
                    />
                    <input
                      min="-90"
                      max="90"
                      step="any"
                      className="input-field"
                      type="number"
                      value={lat}
                      onChange={(e) => setLat(e.target.value)}
                      placeholder="Coordinates"
                    />
                  </div>
                </div>
              </div>
              <label>Description</label>
              <textarea
                className="input-field h-30"
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Description" />
              <label>Upload Images</label>
              <input type="file" accept="image/*" multiple height="40" onChange={handleImage}
                className="bg-gray-200 h-28 rounded border-2 content-center text-center
              hover:bg-gray-100 hover:cursor-pointer" />
              <div className="flex flex-wrap">
                {images.map((img) => (
                  <div className="mb-2" key={img._id}>
                    <img src={img.url} className="object-cover border-2 h-20" />
                    <button className="font-bold hover:cursor-pointer text-red-500 text-2xl" type="button"
                      onClick={() => setImages(prev => prev.filter(i => i._id !== img._id))}>-</button>
                  </div>
                ))}
              </div>
              <div>
                <fieldset className="border-2 p-4 my-2">
                  <legend>Select appropriate seasons</legend>

                  <div>
                    <input type="checkbox" name="Autumn" value={"Autumn"} {...register("season")} />
                    <label >Autumn</label>
                  </div>

                  <div>
                    <input type="checkbox" name="Winter" value={"Winter"} {...register("season")} />
                    <label >Winter</label>
                  </div>

                  <div>
                    <input type="checkbox" name="drone" value={"Summer"} {...register("season")} />
                    <label >Summer</label>
                  </div>
                  <div>
                    <input type="checkbox" name="drone" value={"Monsoon"} {...register("season")} />
                    <label >Monsoon</label>
                  </div>
                </fieldset>
                <div>
                  <label>Best Season</label>
                  <input
                    className="input-field w-full"
                    type="text"
                    value={season}
                    onChange={(e) => setSeason(e.target.value)}
                    placeholder="Best Season" />
                </div>
                <fieldset className="border-2 p-4">
                  <legend>Select defficulty </legend>

                  <div>
                    <input type="checkbox" name="Autumn" value={"Easy"} {...register("difficulty")} />
                    <label >Easy</label>
                  </div>

                  <div>
                    <input type="checkbox" name="Winter" value={"Moderate"} {...register("difficulty")} />
                    <label >Moderate</label>
                  </div>

                  <div>
                    <input type="checkbox" name="drone" value={"Hard"} {...register("difficulty")} />
                    <label >Hard</label>
                  </div>
                </fieldset>
              </div>
              <div>
                <label>Time</label>
                <input
                  className="input-field w-full"
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="Best time" />
              </div>
              <div>
                <label>Route</label>
                <input
                  className="input-field w-full"
                  type="text"
                  value={route}
                  onChange={(e) => setRoute(e.target.value)}
                  placeholder="Route" />
              </div>
              <div>
                <h3>Add Tips</h3>
                {tips.map((tip, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      className="input-field w-full mb-2"
                      type="text"
                      value={tip}
                      onChange={(e) => handleTipsChange(index, e.target.value)}
                      placeholder={`Tips ${index + 1}`}
                    />
                    {
                      tips.length > 1 && (
                        <button onClick={() => setTips(tips.filter((_, i) => i != index))}
                          className="bg-red-500 w-fit px-2 h-fit py-1 rounded-xs text-white hover:cursor-pointer">-</button>
                      )
                    }
                  </div>
                ))}
                <div className="flex flex-row-reverse w-full ">
                  <button onClick={() => setTips([...tips, ""])}
                    className="bg-green-400 w-fit px-2 text-white hover:cursor-pointer" >+</button>
                </div>
              </div>
              <div>
                <h3>Add Features</h3>
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      className="input-field w-full mb-2"
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeaturesChange(index, e.target.value)}
                      placeholder={`Feature ${index + 1}`}
                    />
                    {
                      tips.length > 1 && (
                        <button onClick={() => setFeatures(features.filter((_, i) => i != index))}
                          className="bg-red-500 w-fit px-2 h-fit py-1 rounded-xs text-white hover:cursor-pointer">-</button>
                      )
                    }
                  </div>
                ))}
                <div className="flex flex-row-reverse w-full ">
                  <button onClick={() => setFeatures([...features, ""])}
                    className="bg-green-400 w-fit px-2 text-white hover:cursor-pointer" >+</button>
                </div>
              </div>
              <div>
                <label>Duration</label>
                <input
                  className="input-field w-full mb-2"
                  type="number"
                  value={dur}
                  onChange={(e) => setDur(e.target.value)}
                  placeholder='Maximum Duration' />
              </div>
              <div>
                <label>Distance</label>
                <input
                  className="input-field w-full mb-2"
                  type="number"
                  value={dis}
                  onChange={(e) => setDis(e.target.value)}
                  placeholder='Maximum Distance' />
              </div>
              <button className="bg-blue-500 h-8 rounded-xl hover:cursor-pointer hover:bg-blue-600 text-white" type="submit">Submit</button>
            </form>
          </div >
        </div >
      )}
    </div>
  )
}
