const User = require('../models/User')
const asyncHandler = require('express-async-handler')

const getInfoForLoggedInUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.user })
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  const { email, username } = user // Retrieve email and username from the user object

  if (email && username) {
    res.status(200).json({ email, username });
  } else {
    res.status(400).json({ message: 'Email or username is missing' });
  }
})

module.exports = { getInfoForLoggedInUser }
