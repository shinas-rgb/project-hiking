import TrendingPosts from "../components/TrendingPosts.jsx"
import Navbar from '../components/Navbar.jsx'
import SearchBar from "../components/SearchBar.jsx"

export default function HomePage() {

  return (
    <div
      className='page'>
      <Navbar />
      <SearchBar />
      <div className='mt-8 grid justify-center  text-center' >
        <div className=" bg-gray-600 p-4 flex flex-col gap-4">
          <h2 className="text-3xl max-sm:text-xl">Welcome to Trek wiki of Kerala</h2>
          <p className="max-sm:text-xs">The free wiki pidea for Hikers and Trekkers, where discover hidden places in kerala</p>
        </div>
      </div >
      <TrendingPosts />
    </div >
  )
}
