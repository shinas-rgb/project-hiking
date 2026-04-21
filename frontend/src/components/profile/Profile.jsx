import { useState } from "react"
import { useForm } from "react-hook-form"

export default function Profile() {
  const { register, handleSubmit } = useForm()
  const [coord, setCoord] = useState([])
  function sampleSubmit(data) {
    setCoord([Number(data.num1), Number(data.num2)])
    console.log(coord)
  }
  return (
    <>
      <div className="grid content-center items-center justify-center">
        <div>
          <h1 className="text-2xl mb-4">Welcome to the Profile page</h1>
          <p>Choose from the laft panel</p>
          <form onSubmit={handleSubmit(sampleSubmit)}>
            <input type="number" name="" placeholder="num" {...register("num1", { valueAsNumber: true })} />
            <input type="number" name="" placeholder="num" {...register("num2")} />
            <button type="submit">submit</button>
          </form>
        </div>
      </div>
    </>
  )
}
