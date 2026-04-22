import { Link } from "react-router-dom";
import { checkUser } from "../../utils/auth";

export default function Profile() {
  const user = checkUser()
  return (
    <>
      <div className="grid content-center items-center justify-center">
        <div>
          <h1 className="text-2xl mb-4">Welcome to the Profile page</h1>
          <p>Choose from the panel</p>
          <div className="mt-4 flex flex-col gap-2">
              <button className="bg-gray-500 py-2 px-3 rounded hover:bg-gray-600">
              <Link to="account">
                Account
            </Link>
          </button>

          <button className="bg-gray-500 py-2 px-3 rounded hover:bg-gray-600">
            <Link to="reviews">
              Reviews
            </Link>
          </button>

          <button className="bg-gray-500 py-2 px-3 rounded hover:bg-gray-600">
            <Link to={`/search?bookmarks=true&id=${user.id}`} >
              Bookmarks
            </Link>
          </button>
        </div>
      </div>
    </div >
    </>
  )
}
