const Accommodation = require('../models/Accommodation')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

const getAllAccommodations = asyncHandler(async (req, res) => {
  res.json( await Accommodation.find())
})

const getSpecificAccommodation = asyncHandler(async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ 'message': 'Accomodation ID required.' })

  const accommodation = await Accommodation.findOne({ _id: req.params.id }).exec()
  if (!accommodation) {
    return res.status(204).json({ "message": `No accommodation matches ID ${req.params.id}.` })
  }
  res.json(accommodation)
})

const createNewAccommodation = asyncHandler(async (req, res) => {
  console.log(req.user)
  const {title, address, photos:addPhoto, 
    description, features, 
    extraInfo, checkIn, checkOut, maxGuests, price,} = req.body
  
  if (!title || !address || !price) {
    return res.status(400).json({ message: 'Title, Address and Price fields are required' })
  }

  // Fetch the user ID based on the username
  // req.user.username is coming from verifyJWT middleware, token generated after user logs in
  const user = await User.findOne({ username: req.user.username })
  console.log(user)
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  const ownerId = user._id

  const accomodation = await Accommodation.create({
    owner: ownerId,
    title, address, photos:addPhoto, 
    description, features, 
    extraInfo, checkIn, checkOut, maxGuests, price,
  })

  if (accomodation) { //created 
    res.status(201).json({ message: `New accomodation ${title} created` })
  } else {
    res.status(400).json({ message: 'Invalid accomodation data received' })
  }
})

const getAllAccommodationsForOwner = asyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.user.username })
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
  const {id} = req.params

  const {title, address, photos:addPhoto, 
    description, features, 
    extraInfo, checkIn, checkOut, maxGuests, price,} = req.body

  const accommodation = await Accommodation.findById(id)

  if (!accommodation) {
    return res.status(404).json({ message: 'Accommodation not found' });
  }

  accommodation.title = title
  accommodation.address = address
  accommodation.photos = addPhoto
  accommodation.description = description
  accommodation.features = features
  accommodation.extraInfo = extraInfo
  accommodation.checkIn = checkIn
  accommodation.checkOut = checkOut
  accommodation.maxGuests = maxGuests
  accommodation.price = price

  const updatedAccommodation = await accommodation.save()

  if (updatedAccommodation) {
    res.status(200).json({ message: 'Accommodation updated successfully' });
  } else {
    res.status(404).json({ message: 'Accommodation not found' });
  }
})

module.exports = {
  getAllAccommodations,
  getSpecificAccommodation,
  createNewAccommodation,
  getAllAccommodationsForOwner,
  updateAccommodation
}