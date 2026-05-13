import Navbar from '../components/Navbar.jsx'
import img1 from "../assets/pexels-ashok-sharma-78565317-8680763.jpg"
import img2 from "../assets/pexels-ex-route-adventures-656223369-19716647.jpg"
import img3 from "../assets/pexels-ex-route-adventures-656223369-32109154.jpg"
import img4 from "../assets/pexels-jen-madhi-1597353-12121705.jpg"
import img5 from "../assets/pexels-k-s-aravinda-kashyap-86628820-31580155.jpg"
import { Link } from "react-router-dom";
import { checkUser } from '../utils/auth.js'

export default function HomePage() {
  const user = checkUser()
  return (
    <div
      className='page mb-8 max-w-full h-screen'>
      <div className="absolute inset-x-0 top-0 z-50">
        <Navbar />
      </div>
      {/* Hero section */}
      <div className="relative z-10 isolate px-2 lg:px-8 h-full">
        <div className="mx-auto max-w-2xl pt-26 h-full">
          <div className="flex flex-col h-full">
            <h2 className="text-6xl canva-bold font-extrabold text-white sm:text-6xl max-sm:w-1/3 leading-16 sm:mt-46">
              Travel Without Limits
            </h2>

            <p className="mt-8 sm:mt-4 text-base font-bold canva-regular text-zinc-300 sm:text-center">
              The wiki pidea for Hikers, where discover hidden places
            </p>

            <div className='max-sm:mt-auto canva-regular
              sm:flex sm:justify-center sm:mt-8 sm:gap-4'>
              {!user && (
                <div className="mb-4 flex items-center justify-center gap-x-6  font-bold  bg-blue-400 py-3 rounded-full text-white
                  sm:bg-zinc-800 sm:border sm:border-zinc-700 sm:w-fit sm:py-3 sm:px-3 sm:rounded-md sm:text-sm sm:mb-0">
                  <Link to="/auth">
                    <button type=""
                      className="
                     hover:cursor-pointer tracking-wide">
                      Get Started
                    </button>
                  </Link>
                </div>
              )}
              <a href="/search">
                <div className='canva-bold max-sm:mb-20 text-sm tracking-wide  bg-white text-center font-semibold text-black py-4 rounded-full w-full
                sm:bg-zinc-900/0 sm:text-white sm:hover:bg-zinc-900/40 sm:border sm:border-zinc-700 sm:font-extrabold sm:mb-0 sm:w-fit sm:rounded-md sm:py-2 sm:px-2'>
                  Explore the world
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <section className="overflow-hidden pb-16 h-screen">
        <div
          className="absolute inset-0 bg-cover bg-right border-b-2 border-white"
          style={{
            backgroundImage: `url(${img5})`,
          }}
        >
        </div>
        <div className="absolute inset-0 bg-black/40 sm:bg-black/70" />
        <div className="mx-auto max-w-7xl px-10 max-sm:py-10 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">

            {/* LEFT SIDE */}
            <div className="space-y-2 canva-bold sm:space-y-6 ">
              <h2 className="text-2xl tracking-wide text-white sm:text-4xl">
                “ In every walk with nature, one receives far more than they seek ”
              </h2>
              <h1 className="text-xl font-bold justify-self-end sm:mr-18  tracking-tight text-white sm:text-3xl">
                — John Muir
              </h1>
            </div>

            {/* RIGHT SIDE IMAGE TILES */}
            <div className="grid grid-cols-3 sm:gap-8 gap-4 sm:mt-12">

              {/* COLUMN 1 */}
              <div className="space-y-6 pt-16">
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
