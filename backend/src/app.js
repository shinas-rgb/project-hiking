import express from "express"
import placeRoutes from "./modules/place/place.routes.js"
import dotenv from "dotenv"
import cors from "cors"

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

app.use('*splat', (req, res) => {
  res.status(404).json({ message: 'Page not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

export default app
