// src/components/HeroSection.jsx

export default function TestPage() {

  return (
    <div className="">
      <div className="flex gap-4">
        <div className="w-64 h-94 bg-dark border border-zinc-800 rounded-2xl">
          <h1 className="py-2 px-4 m-2 hover:bg-zinc-900 rounded-2xs">Hello</h1>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-lime-300 bg-lime-950 px-4 py-2 w-fit rounded-xl">234%</p>
          <p className="text-pink-400 bg-red-950 px-4 py-2 w-fit rounded-xl">234%</p>
          <button type="" className="border border-zinc-700 hover:border-zinc-600 hover:bg-zinc-800 bg-zinc-900 py-1 rounded-md text-white">Click</button>
          <button type="" className="border border-zinc-400 hover:border-zinc-300 hover:bg-zinc-500 bg-zinc-600 rounded-md py-1 text-white">Click</button>
        </div>
      </div>
    </div>
  );
}
