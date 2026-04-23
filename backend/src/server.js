import express from "express";
import globalRoutes from "./routes/globalRoutes.js";
import signupRoutes from "./routes/signupRoutes.js"
import reviewRoutes from "./routes/reviewRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 8080

connectDB();

app.use(express.json())
app.use(cors({
  origin: "https://project-hiking.vercel.app",
  credentials: true
}))

app.use("/place", globalRoutes)
app.use("/auth", signupRoutes)
app.use("/review", reviewRoutes)
app.use("/upload", uploadRoutes)

app.listen(PORT, () => {
  console.log(`Server started at port:`, PORT)
})
