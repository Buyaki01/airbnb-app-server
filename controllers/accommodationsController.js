const Accommodation = require('../models/Accommodation')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

const getAllAccommodations = asyncHandler(async (req, res) => {
  res.json( await Accommodation.find())
})

const getSpecificAccommodation = asyncHandler(async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ 'message': 'Accommodation ID required.' })

  const accommodation = await Accommodation.findOne({ _id: req.params.id }).exec()
  if (!accommodation) {
    return res.status(204).json({ "message": `No accommodation matches ID ${req.params.id}.` })
  }
  res.json(accommodation)
})

const createNewAccommodation = asyncHandler(async (req, res) => {
  const {title, address, addPhoto, 
    description, features, 
    extraInfo, checkIn, checkOut, maxGuests, price,} = req.body
  
  if (!title || !address || !price) {
    return res.status(400).json({ message: 'Title, Address and Price fields are required' })
  }

  // Fetch the user ID based on the username
  // req.user is coming from verifyJWT middleware, token generated after user logs in
  const user = await User.findOne({ username: req.user })
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  const ownerId = user._id

  const accommodation = await Accommodation.create({
    owner: ownerId,
    title, address, photos:addPhoto, 
    description, features, 
    extraInfo, checkIn, checkOut, maxGuests, price,
  })

  if (accommodation) { //created 
    res.status(201).json({ message: `New accommodation ${title} created` })
  } else {
    res.status(400).json({ message: 'Invalid accommodation data received' })
  }
})

const getAllAccommodationsForOwner = asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.user })
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  const ownerId = user._id

  const accommodations = await Accommodation.find({ owner: ownerId })

  if (accommodations.length > 0) {
    res.status(201).json(accommodations)
  } else {
    res.status(400).json({ message: 'Error retrieving accommodations for owner' })
  }
})

const updateAccommodation = asyncHandler(async (req, res) => {
  const { id, title, address, photos, description, features, extraInfo, checkIn, checkOut, maxGuests, price } = req.body

  if (!id) {
    return res.status(400).json({ message: 'ID field is required' })
  }

  let accommodation = await Accommodation.findById(id)

  if (!accommodation) {
    return res.status(404).json({ message: 'Accommodation not found' })
  }

  accommodation.title = title
  accommodation.address = address
  accommodation.photos = photos
  accommodation.description = description
  accommodation.features = features
  accommodation.extraInfo = extraInfo
  accommodation.checkIn = checkIn
  accommodation.checkOut = checkOut
  accommodation.maxGuests = maxGuests
  accommodation.price = price

  accommodation = await accommodation.save()

  if (accommodation) {
    res.status(200).json({ message: 'Accommodation updated successfully' })
  } else {
    res.status(500).json({ message: 'Error updating accommodation' })
  }
})

module.exports = {
  getAllAccommodations,
  getSpecificAccommodation,
  createNewAccommodation,
  getAllAccommodationsForOwner,
  updateAccommodation
}