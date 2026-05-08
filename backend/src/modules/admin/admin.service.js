import Place from "../place/place.model.js"
import User from "../user/user.model.js"

export const getAllUsers = async () => {
  const users = await User.find()
  return users
}

export const getAllPlaces = async () => {
  const places = await Place.find()
  return places
}
