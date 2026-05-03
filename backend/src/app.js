import express from "express"
import placeRoutes from "./modules/place/place.routes.js"
import userRoutes from "./modules/user/user.routes.js"
import reviewRoutes from "./modules/review/review.routes.js"
import dotenv from "dotenv"
import cors from "cors"
import { errorHandler } from "./middleware/error.middleware.js"

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use('/api/places', placeRoutes)
app.use('/api/users', userRoutes)
app.use('/api/reviews', reviewRoutes)

app.use('*splat', (req, res) => {
  res.status(404).json({ message: 'Page not found' })
})

app.use(errorHandler)

export default app
