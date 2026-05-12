import Loader from "./Loader";

export default function Loading() {
  return <div className="flex flex-col gap-4 justify-center text-xl items-center h-screen">
    <h1>Loading...</h1>
    <Loader />
  </div>
}
