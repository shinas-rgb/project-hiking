export const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    res.status(403).json({ message: "Admin access only" })
  }
  next()
}
