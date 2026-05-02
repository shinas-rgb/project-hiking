import { connectDB } from "./config/db.js";
import app from "./app.js"

const PORT = process.env.PORT || 8080
connectDB();

app.listen(PORT, () => {
  console.log(`Server started at port:`, PORT)
})
