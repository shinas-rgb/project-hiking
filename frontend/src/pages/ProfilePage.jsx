import { Outlet } from "react-router-dom"

export default function UserProfile() {
  return (
    <div>
      <div className="">
        {/* Content */}
        <div className="mx-4 canva-regular">
          <Outlet />
        </div>
      </div>
    </div >
  )
}
