import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <div className='hero mt-4'>
        <div className="flex justify-between mx-8">
          <Link to="/">
            <h2 className="bg-blue-400 py-2 px-4 rounded-xl text-white hover:cursor-pointer">Home</h2>
          </Link>
          <h1 className='hero-title text-4xl'>Kerala Hike & Truk</h1>
          <Link to="/auth">
            <button className="bg-green-400 py-2 px-4 rounded-xl text-white hover:cursor-pointer">Login</button>
          </Link>
        </div>
        <p className='hero-para'>Descover Kerala's hidden and adventurous trucking spots</p>
      </div>
    </div>
  )
}
