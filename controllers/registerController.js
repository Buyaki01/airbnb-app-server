const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

const getAllUsers = asyncHandler(async (req, res) => {
  // Get all users from MongoDB
  const users = await User.find().select('-password').lean()

  // If no users 
  if (!users?.length) {
      return res.status(400).json({ message: 'No users found' })
  }

  res.json(users)
})

const createNewUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body

  // Confirm data
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  // Check for duplicate email
  const duplicate = await User.findOne({ email }).collation({ locale: 'en', strength: 2 }).lean().exec()

  if (duplicate) {
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
  getAllUsers,
  createNewUser
}