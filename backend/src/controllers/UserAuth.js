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
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already in use" })
    }
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
        role: user.role,
        email: user.email,
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

export async function passwordChange(req, res) {
  try {
    const { email, oldPass, newPass } = req.body
    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) return res.status(404).json({ message: "User not found" })

    const isMatch = await bcrypt.compare(oldPass, user.password)
    if (!isMatch) return res.status(400).json({ message: "incorrect password" })

    if (oldPass === newPass) return res.status(400).json({ message: "Use different password" })

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPass, salt)

    await User.findOneAndUpdate({ email: email.toLowerCase() }, { password: hashedPassword }, { returnDocument: 'after' })
    res.status(201).json({ message: "password changed successfully" })
  } catch (error) {
    res.status(500).json({ message: "Internal server error" })
  }
}

export async function getAllUsers(req, res) {
  try {
    const users = await User.find()
    res.status(200).json(users)
    if (!users) return res.status(404).json({ messsage: "Users fetch failed" })
  } catch (error) {
    res.status(500).json({ message: "Internal server error" })
  }
}

export async function changeRole(req, res) {
  try {
    const { email, role } = req.body
    const user = await User.findOneAndUpdate({ email }, { role }, { returnDocument: 'after' })
    if (!user) return res.status(404).json({ message: "User not found" })
    res.status(201).json({ message: "Role changed successfully", user })
  } catch (error) {
    res.status(500).json({ message: "Internal server error" })
  }
}

export async function deleteUser(req, res) {
  try {
    const { id, password } = req.body

    const user = await User.findById(id)
    if (!user) return res.status(404).json({ message: "User not found" })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: "Password is incorrect" })

    await User.findByIdAndDelete(id)
    res.status(200).json({ message: "User deleted" })
  } catch (error) {
    res.status(500).json({ message: "Internal server error" })
  }
}
