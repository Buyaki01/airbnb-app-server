const Booking = require('../models/Booking')
const asyncHandler = require('express-async-handler')

const createNewBooking = asyncHandler(async (req, res) => {
  const {accommodationId, checkIn, 
    checkOut, noOfGuests, name, 
    mobileNumber, price} = req.body
  
  const ownerId = req.user

  const booking = await Booking.create({
    accommodationId,
    userId: ownerId, 
    checkIn, 
    checkOut, 
    noOfGuests, 
    name, 
    mobileNumber, 
    price
  })

  if (booking) { //created 
    res.status(201).json({ message: `New Booking created` })
  } else {
    res.status(400).json({ message: 'Invalid Booking data received' })
  }
})

const getAllBookingsByOwner = asyncHandler(async (req, res) => {
  const ownerId = req.user

  // Find all bookings where the owner's ID matches the userId in the Booking model
  const bookings = await Booking.find({ userId: ownerId }).populate('accommodationId')

  if (bookings) {
    res.status(200).json(bookings)
  } else {
    res.status(404).json({ message: 'No bookings found' })
  }
})

const getSpecificBooking = asyncHandler(async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ 'message': 'Booking ID required.' })
  
  const ownerId = req.user

  const booking = await Booking.findOne({ _id: req.params.id, userId: ownerId }).populate('accommodationId')

  if (booking) {
    res.status(200).json(booking)
  } else {
    res.status(404).json({ message: 'Booking not found' })
  }
})

module.exports = {
  createNewBooking,
  getAllBookingsByOwner,
  getSpecificBooking
}