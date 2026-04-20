import { useForm } from "react-hook-form"
import { useNavigate, useSearchParams } from "react-router-dom"

export default function SearchBar() {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const [searchParam] = useSearchParams()

  async function onSubmit(data) {
    if (data.search) {
      if (searchParam.has("q")) {
        searchParam.set("q", data.search)
        navigate(`/search?${searchParam}`)
      } else
        navigate(`/search?q=${data.search}&${searchParam}`)
    } else {
      navigate(`/search?trending=true`)
    }
  }

  return (
    <div className='flex justify-center max-sm:text-xs'>
      <div className='flex items-center border border-gray-400 text-gray-300 pl-2 h-8'>
        <svg className='search-icon fill-gray-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z" /></svg>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="Search for places" className="w-fit"
            {...register("search")} />
        </form>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <button type="submit"
          className="border border-gray-400 bg-gray-700 text-white p-2 hover:cursor-pointer h-8 hover:bg-gray-600 items-center flex"
        > Search</button>
      </form>
    </div >
  )
}
