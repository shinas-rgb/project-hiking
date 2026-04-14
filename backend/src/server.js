import express from "express";
import globalRoutes from "./routes/globalRoutes.js";
import signupRoutes from "./routes/signupRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"
import cors from "cors"
import { protect } from "./middleware/authMiddleware.js";

dotenv.config()
const app = express()
const PORT = process.env.PORT || 8080

connectDB();

app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173",
}))

app.use("/place", globalRoutes);
app.use("/auth", signupRoutes)

app.listen(PORT, () => {
  console.log(`Server started at port:`, PORT)
})
