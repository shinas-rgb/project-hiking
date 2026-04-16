import { useForm } from "react-hook-form"
import toast, { Toaster } from "react-hot-toast"
import api from "../api/api"

export default function AddPlace() {
  const { register, handleSubmit } = useForm()
  async function onSubmit(data) {
    try {
      const res = await api.post("/place", {
        title: data.name,
        content: data.content,
        link: data.link
      })
      toast.success(res.data)
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong"
      toast.error(message)
    }
  }
  return (
    <div className="page grid justify-center content-center w-full h-screen">
      <div className="form-container">
        <h1 className="text-2xl text-center mb-4">Add A Place</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="new-form align-text-top">
          <input
            className="input-field"
            type="text"
            placeholder="Name of place"
            {...register('name', { required: 'Name of Place is Required' })} />
          <textarea
            className="input-field h-30"
            type="text"
            placeholder="Content"
            {...register('content', { required: 'Content of Place is Required' })} />
          <input
            className="input-field"
            type="url"
            placeholder="link of image"
            {...register('link', { required: 'Link of Image is Required' })} />
          <button className="bg-blue-500 h-8 rounded-xl hover:cursor-pointer hover:bg-blue-600 text-white" type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}
