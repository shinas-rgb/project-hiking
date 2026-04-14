import mongoose from "mongoose";

export const connectDB = async () => {
  console.log("db")
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB connected successfully")
  } catch (error) {
    console.log("ERROR connecting MongoDB", error)
    process.exit(1)
  }
}
