// src/components/HeroSection.jsx

import img from "../assets/pexels-vizi-kata-373820-33314427.jpg"

export default function TestPage() {


  return (
    <div className="">
      <div className="h-screen">
        <div className="grid grid-cols-2 overflow-hidden h-full">
          <img className="object-cover bg-center bg-cover" src={img} alt="" />
          <div className="bg-zinc-800 px-28 flex flex-col justify-center h-screen">
            <h1 className="absolute top-4 left-4 text-2xl font-extrabold">Trek wiki</h1>
            <div className="mb-8">
              <h1 className="text-6xl mb-2">Login to your account</h1>
              <p className="text-zinc-400">Already have an account ? <a className="text-blue-500 hover:underline" href="">Sign Up</a></p>

            </div>
            <form className="flex flex-col gap-6 text-zinc-300">
              <input
                className="w-full bg-zinc-700 px-3.5 py-2.5 rounded-md"
                type="email" placeholder="Email address" />
              <input
                className="w-full bg-zinc-700 px-3.5 py-2.5 rounded-md"
                type="password" placeholder="Password" />
              <div>
                <input className="mr-1.5" type="checkbox" />
                <label>Remember me</label>
              </div>
              <button
                className="bg-zinc-500 py-2 rounded-md
                hover:cursor-pointer hover:bg-zinc-600"
                type="submit">Log In</button>
            </form>
          </div>
        </div>
      </div>
      {/* <div className="flex gap-4"> */}
      {/*   <div className="w-64 h-94 bg-dark border border-zinc-800 rounded-2xl"> */}
      {/*     <h1 className="py-2 px-4 m-2 hover:bg-zinc-900 rounded-2xs">Hello</h1> */}
      {/*   </div> */}
      {/*   <div className="flex flex-col gap-4"> */}
      {/*     <p className="text-lime-300 bg-lime-950 px-4 py-2 w-fit rounded-xl">234%</p> */}
      {/*     <p className="text-pink-400 bg-red-950 px-4 py-2 w-fit rounded-xl">234%</p> */}
      {/*     <button type="" className="border border-zinc-700 hover:border-zinc-600 hover:bg-zinc-800 bg-zinc-900 py-1 rounded-md text-white">Click</button> */}
      {/*     <button type="" className="border border-zinc-400 hover:border-zinc-300 hover:bg-zinc-500 bg-zinc-600 rounded-md py-1 text-white">Click</button> */}
      {/*   </div> */}
      {/* </div> */}
    </div>
  );
}
