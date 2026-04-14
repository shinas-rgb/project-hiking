import TrendingPosts from "../components/TrendingPosts.jsx"
import Navbar from '../components/Navbar.jsx'
import SearchBar from "../components/SearchBar.jsx"

export default function HomePage() {
  return (
    <div
      className='page'>
      < section className='first-section' >
        <Navbar />
        <SearchBar/>
      </section >
      <TrendingPosts />
    </div >
  )
}
