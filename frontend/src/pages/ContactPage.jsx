import Navbar from "../components/Navbar";
import instagram from "../assets/instagram.png"
import github from "../assets/github.png"
import linkdin from "../assets/message.png"

export default function ContactPage() {
  return (
    <div className="text-white h-screen">
      <Navbar />
      <div className="text-center text-2xl mb-2 canva-bold">
        <h2>Contact</h2>
      </div>
      <div className="mx-4">
        <div className="bg-zinc-200 p-4 rounded-2xl sm:p-2">
          <h2 className="text-xl canva-bold text-center text-zinc-800">Socials</h2>
          <div className="flex justify-around w-full my-2">
            <a href="https://www.instagram.com/shinas.ig">
              <img src={instagram} className="h-10" />
            </a>
            <a href="https://www.github.com/shinas-rgb">
              <img src={github} className="h-10" />
            </a>
            <a href="https://www.linkedin.com/in/shinas-in">
              <img src={linkdin} className="h-10" />
            </a>
          </div>
        </div>
        <div className="my-8">
          <h2 className="text-2xl canva-bold mb-2">Info</h2>
          <p>shinasmuhammedkt@gmail.com</p>
          <p>854790616834</p>
        </div>
        <div className="my-8">
          <h2 className="text-2xl canva-bold mb-2">Address</h2>
          <p>Asthelavista Tower</p>
          <p>Red streat 251</p>
          <p>Thailand</p>
        </div>
      </div>
    </div>
  )
}
