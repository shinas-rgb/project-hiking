import TrendingPosts from "../components/TrendingPosts.jsx"
import Navbar from '../components/Navbar.jsx'

export default function HomePage() {

  return (
    <div
      className='page'>
      <Navbar />
      <div className='mt-8 grid justify-center  text-center' >
        <div className=" bg-gray-600 p-4 flex flex-col gap-4">
          <h2 className="text-3xl">Welcome to Trek wiki of Kerala</h2>
          <p>The free wiki pidea for Hikers and Trekkers, where discover hidden places in kerala</p>
        </div>
      </div >
      <TrendingPosts />
    </div >
  )
}
