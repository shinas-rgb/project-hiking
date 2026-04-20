import TrendingPosts from "../components/TrendingPosts.jsx"
import Navbar from '../components/Navbar.jsx'
import SearchBar from "../components/SearchBar.jsx"
import { Link } from "react-router-dom"

export default function HomePage() {

  return (
    <div
      className='page mb-8 max-w-full'>
      <Navbar />
      <SearchBar />
      <div className='mt-8 grid justify-center  text-center' >
        <div className=" bg-gray-600 p-4 flex flex-col gap-4">
          <h2 className="text-3xl max-sm:text-xl">Welcome to Trek wiki of Kerala</h2>
          <p className="max-sm:text-xs">The free wiki pidea for Hikers and Trekkers, where discover hidden places in kerala</p>
        </div>
      </div >
      {/* <TrendingPosts /> */}
      <div className="grid justify-center content-center items-center text-xl   w-full  ">
        <div className="w-fit italic text-gray-400 border-2 rounded-xl p-4 mt-8 max-sm:text-xs max-sm:p-2 max-sm:m-8">
          <h3>“The best view comes after the hardest climb.”</h3>
          <h3> “Hiking is not escape — it’s connection.” </h3>
          <h3> “Take only memories, leave only footprints.” </h3>
          <h3> “Every mountain top is within reach if you keep climbing.” </h3>
          <h3> “In every walk with nature, one receives far more than they seek.” — John Muir </h3>
          <h3> “Go where you feel most alive.” </h3>
          <h3> “The mountains are calling, and I must go.” — John Muir</h3>
        </div>
      </div>
      <div className="px-8 py-8">
        <div className="h-1 w-full bg-gray-600 my-4">
        </div>
        <div className="flex justify-around">
          <button className="text-white hover:text-gray-300 hover:cursor-pointer">Contact</button>
          <Link to="/add-place">
            <button className=" text-white hover:text-gray-300  hover:cursor-pointer">Add new Place</button>
          </Link>
        </div>
      </div>
    </div >
  )
}
