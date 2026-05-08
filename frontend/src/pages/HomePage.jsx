import Navbar from '../components/Navbar.jsx'
import img1 from "../assets/pexels-ashok-sharma-78565317-8680763.jpg"
import img2 from "../assets/pexels-ex-route-adventures-656223369-19716647.jpg"
import img3 from "../assets/pexels-ex-route-adventures-656223369-32109154.jpg"
import img4 from "../assets/pexels-jen-madhi-1597353-12121705.jpg"
import img5 from "../assets/pexels-k-s-aravinda-kashyap-86628820-31580155.jpg"
import img0 from "../assets/pexels-tom-fly-2150802027-31410276.jpg"
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div
      className='page mb-8 max-w-full'>
      <Navbar />
      {/* Hero section */}
      <div className="relative z-10 isolate px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-52">
          <div className="text-center">
            <h1 className="text-5xl font-semibold text-white sm:text-6xl">
              Find and explore hidden and adventerous trekking spots
            </h1>

            <p className="mt-8 text-lg text-gray-400">
              The wiki pidea for Hikers, where discover hidden places
            </p>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/auth">
                <button type=""
                  className="border font-semibold border-zinc-700  bg-zinc-900 px-3.5 py-2.5 rounded-md text-white
                hover:border-zinc-600 hover:bg-zinc-800 hover:cursor-pointer">
                  Get Started
                </button>
              </Link>
              <a href="#" className="text-sm font-semibold text-white">
                Find Places →
              </a>
            </div>
          </div>
        </div>
      </div>

      <section className="overflow-hidden pb-16">
        <div
          className="absolute inset-0 bg-cover bg-center border-b-2 border-white"
          style={{
            backgroundImage: `url(${img0})`,
          }}
        >
        </div>
        <div className="absolute inset-0 bg-black/70" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">

            {/* LEFT SIDE */}
            <div className="space-y-8">
              <h1 className="text-5xl font-bold tracking-tight text-white sm:text-5xl">
                “ In every walk with nature, one receives far more than they seek ”
              </h1>
              <h1 className="text-5xl font-bold justify-self-end mr-18 tracking-tight text-white sm:text-3xl">
                — John Muir
              </h1>
            </div>

            {/* RIGHT SIDE IMAGE TILES */}
            <div className="grid grid-cols-3 gap-8">

              {/* COLUMN 1 */}
              <div className="space-y-6 pt-32">
                <img
                  src={img1}
                  alt=""
                  className="aspect-[2/3] w-full rounded-3xl object-cover"
                />

                <img
                  src={img2}
                  alt=""
                  className="aspect-[2/3]  w-full rounded-3xl object-cover"
                />
              </div>

              {/* COLUMN 2 */}
              <div className="space-y-6">
                <img
                  src={img3}
                  alt=""
                  className="aspect-[2/3] w-full rounded-3xl object-cover"
                />

                <img
                  src={img4}
                  alt=""
                  className="aspect-[2/3] w-full rounded-3xl object-cover"
                />
              </div>

              {/* COLUMN 3 */}
              <div className="space-y-6 pt-20">
                <img
                  src={img5}
                  alt=""
                  className="aspect-[2/3] w-full rounded-3xl object-cover"
                />
              </div>

            </div>
          </div>
        </div>
      </section>
    </div >
  )
}
