import jwt from "jsonwebtoken"
import ApiError from "../utils/ApiError.js"

export const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) throw new ApiError(401, "Invalid token")

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new ApiError(401, "Token expired"))
    }

    if (error.name === "JsonWebTokenError") {
      return next(new ApiError(401, "Invalid token"))
    }
    next(error)
  }
}
