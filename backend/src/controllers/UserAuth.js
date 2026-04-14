import jwt from "jsonwebtoken"
import User from "../models/User.js"
import bcrypt from "bcryptjs"

export async function createUser(req, res) {
  try {
    const { email, password } = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new User({ email, password: hashedPassword })
    await newUser.save()
    res.status(201).json({ message: "user created" })
    console.log(newUser)
  } catch (error) {
    res.status(500).json({ message: "Internal server error" })
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) return res.status(404).json({ message: "User not found" })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: "incorrect password" })

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )
    // localStorage.setItem("token", token)
    res.status(200).json({ message: "login successful", token })
  } catch (error) {
    res.status(500).json({ message: "Internal server error" })
  }
}
