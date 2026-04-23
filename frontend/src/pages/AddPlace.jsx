import { useForm } from "react-hook-form"
import toast, { Toaster } from "react-hot-toast"
import api from "../api/api"
import NavBar from "../components/Navbar.jsx"
import { useState } from "react"
import { checkUser } from "../utils/auth.js"

export default function AddPlace() {
  const { register, handleSubmit } = useForm()
  const [tips, setTips] = useState([""])
  const [features, setFeatures] = useState([""])
  const [files, setFiles] = useState(null)
  const user = checkUser()

  async function onSubmit(data) {
    try {
      if (!files || files.length === 0) return

      const formData = new FormData()
      for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i])
      }

      const imageRes = await api.post('/upload', formData)
      const uploadedImages = imageRes.data

      const res = await api.post("/place", {
        title: data.title,
        description: data.description,
        images: uploadedImages,
        location: {
          type: "Point",
          coordinates: [Number(data.coordLon), Number(data.coordLat)]
        },
        bestSeason: data.season,
        season: data.bestSeason,
        difficulty: data.difficulty,
        bestTime: data.bestTime,
        route: data.route,
        tips: tips,
        features: features,
        duration: data.duration,
        distance: data.distance,
        trending: true,
        createdBy: user.id,
        rating: 0,
      })
      toast.success(res.data.message)
      console.log(uploadedImages)
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong"
      toast.error(message)
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
  return (
    <div>
      <NavBar />
      {/* <button className="text-white m-8 hover:cursor-pointer" onClick={updateMany}>Update</button> */}
      <div className=" grid justify-center w-fit sm:mx-4 mb-8 sm:w-full">
        <div className="sm:p-8 px-4 py-8 rounded-2xl bg-gray-300">
          <h1 className="text-2xl text-center mb-4 bg-black
            max-sm:text-xl">Add A Place</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="new-form align-text-top flex gap-2">
            <div className="flex gap-2 max-sm:flex-col">
              <div className="flex flex-col" >
                <label>Title</label>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Name of place"
                  {...register('title', { required: 'Name of Place is Required' })} />
              </div>
              <div className="flex flex-col">
                <label>Cords</label>
                <div classname="">
                  <input
                    min="-180"
                    max="180"
                    step="any"
                    className="input-field"
                    type="number"
                    placeholder="Coordinates"
                    {...register('coordLon', {
                      required: 'Coordinates of Place is Required',
                      valueAsNumber: true,
                      min: { value: -180, message: "Minimum is -180" },
                      max: { value: 180, message: "Maximum is 180" }
                    })} />
                  <input
                    min="-90"
                    max="90"
                    step="any"
                    className="input-field"
                    type="number"
                    placeholder="Coordinates"
                    {...register('coordLat', {
                      required: 'Coordinates of Place is Required',
                      valueAsNumber: true,
                      min: { value: -90, message: "Minimum is -90" },
                      max: { value: 90, message: "Maximum is 90" }
                    })} />
                </div>
              </div>
            </div>
            <label>Description</label>
            <textarea
              className="input-field h-30"
              type="text"
              placeholder="Description"
              {...register('description', { required: 'Description of Place is Required' })} />
            <label>Upload Images</label>
            <input type="file" accept="image/*" multiple height="40" onChange={handleImage}
              className="bg-gray-200 h-28 rounded border-2 content-center text-center
              hover:bg-gray-100 hover:cursor-pointer" />
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
                  placeholder="Best Season"
                  {...register('bestSeason')} />
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
                placeholder="Best time"
                {...register('bestTime')} />
            </div>
            <div>
              <label>Route</label>
              <input
                className="input-field w-full"
                type="text"
                placeholder="Route"
                {...register('route', { required: 'Route is Required' })} />
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
                placeholder='Maximum Duration'
                {...register('duration', { required: 'Maximum duration is Required' })} />
            </div>
            <div>
              <label>Distance</label>
              <input
                className="input-field w-full mb-2"
                type="number"
                placeholder='Maximum Distance'
                {...register('distance', { required: 'Maximum distance is Required' })} />
            </div>
            <button className="bg-blue-500 h-8 rounded-xl hover:cursor-pointer hover:bg-blue-600 text-white" type="submit">Submit</button>
          </form>
        </div >
      </div >
    </div>
  )
}
