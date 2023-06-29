const Booking = require('../models/Booking')
const asyncHandler = require('express-async-handler')

const createNewBooking = asyncHandler(async (req, res) => {
  const {accomodationId, checkIn, 
    checkOut, noOfGuests, name, 
    mobileNumber, price} = req.body
  
  const ownerId = req.user.id

  const booking = await Booking.create({
    userId:ownerId,
    accomodationId, 
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

const allBookingsByOwner = asyncHandler(async (req, res) => {
  const ownerId = req.user.id

  // Find all bookings where the owner's ID matches the userId in the Booking model
  const bookings = await Booking.find({ userId: ownerId }).populate('accomodationId')

  if (bookings) {
    res.status(200).json({ message: `Booking found` })
  } else {
    res.status(404).json({ message: 'No bookings found' })
  }
})

module.exports = {
  createNewBooking,
  allBookingsByOwner
}