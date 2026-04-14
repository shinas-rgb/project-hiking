import { jwtDecode } from "jwt-decode"

export function checkUser() {
  const token = localStorage.getItem("token")
  if (!token) return null
  try {
    return jwtDecode(token)
  } catch (error) {
    return null
  }
}
