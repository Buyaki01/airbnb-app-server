const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

const getUsers = asyncHandler(async (req, res) => {
  res.json( await User.find())
})

const createNewUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body

  // Confirm data
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  // Check for duplicate username. Collation handles case-sensitive data
  const duplicateUsername = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec()

  if (duplicateUsername) {
    return res.status(409).json({ message: 'Duplicate username' })
  }

  // Check for duplicate email
  const duplicateEmail = await User.findOne({ email }).collation({ locale: 'en', strength: 2 }).lean().exec()

  if (duplicateEmail) {
    return res.status(409).json({ message: 'Duplicate email' })
  }

  // Hash password 
  const hashedPwd = await bcrypt.hash(password, 10) // salt rounds
  
  const userObject = { username, "password": hashedPwd, email }

  // Create and store new user 
  const user = await User.create(userObject)

  if (user) { //created 
    res.status(201).json({ message: `New user ${username} created` })
  } else {
    res.status(400).json({ message: 'Invalid user data received' })
  }
})

module.exports = {
  getUsers,
  createNewUser
}