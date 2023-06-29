const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  const foundUser = await User.findOne({ username }).exec()

  if (!foundUser) {
    return res.status(401).json({ message: 'Unauthorized'})
  }

  const match = await bcrypt.compare(password, foundUser.password)

  if (!match) return res.status(401).json({ message: 'Unauthorized' })

  const accessToken = jwt.sign(
    {
      "UserInfo": foundUser.username,
      "roles": foundUser.roles
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  )

  const refreshToken = jwt.sign(
    { "username": foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  )

  // Create secure cookie with refresh token
  res.cookie('jwt', refreshToken, {
    httpOnly: true, 
    secure: true,
    sameSite: 'None',
    maxAge: 7 * 24 * 60 * 60 * 1000
  })
  
  // Send accessToken containing username and roles
  res.json({ accessToken })
})

const refresh = (req, res) => {

}

const logout = (req, res) => {

}

module.exports = {
  login,
  refresh,
  logout
}